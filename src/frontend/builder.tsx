import * as React from 'react'
import {MouseEvent as ReactMouseEvent, useCallback, useMemo} from 'react'
import {common_RevisionID} from '@kue-space/common'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import ReactFlow, {
   ConnectionMode,
   Controls,
   MiniMap,
   Node,
   ReactFlowProvider,
   useReactFlow
} from 'react-flow-renderer/nocss'
import {Dispatcher, RootState} from '@intf/State'
import {SidebarEvents} from '@intf/Sidebar'
import {Requests} from '@intf/Requests'
import {ModalEvents} from '@intf/Modal'
import {ProgressbarEvents} from '@intf/Progressbar'
import {ToolbarEvents} from '@intf/Toolbar'
import {AppReactFlowProps} from '@intf/App'

import {
   getBaseRevision,
   getSelectedBlock,
   getActiveRevisions, isActiveTemplateLocal,
   isWidgetActive,
   isWidgetGroupBusy
} from '@state/selectors'
import {
   changeRevision,
   discardLocalTemplate,
   discardRemoteTemplate,
   unsetWidgets
} from '@state/combined'
import {AsyncProcesses, WidgetGroups, Widgets} from '@root/properties'
import {
   getGoalBlock,
   getNodeTypes,
   newBlock, newEdge, newTemplateItem, removeEdgesIterator, removeNodesIterator, revisionStorageForBlankTemplate,
   updateAllNodesIterator, updateNodeDataIterator,
   updateNodeWidgetsIterator, updateSelectedNodeIterator
} from '@helpers/convert'
import {
   deselectBlock,
   selectBlock,
   selectTemplate,
   setActiveTemplateRevisions,
   setAsyncProcess,
   toggleNewCardModal,
   toggleNewCardWidgetModal,
   toggleViewCardWidgetModal,
   updateActiveTemplate,
   createTemplate,
   setActiveTemplateAsLocal,
   resetUnsavedStepsAndBlocks,
   toggleTemplatesRevisionSaveAsNewForm,
   toggleTemplatePublishModal
} from '@state/actions'

import onPullTemplateHook from '@root/hooks/on_pull_template'
import onSelectAnotherBlockHook from '@root/hooks/on_select_another_blocks'
import onDeselectBlockHook from '@root/hooks/on_deselect_block'

import UI from '@frontend/ui/ui'
import Progressbar from '@frontend/common/progressbar/progressbar'
import Sidebar from '@frontend/common/sidebar/sidebar'
import SidebarTemplates from '@frontend/pages/templates/sidebar/sidebar_templates'
import SidebarTemplate from '@frontend/pages/template/sidebar/sidebar_template'
import SidebarSettings from '@frontend/pages/settings/sidebar/sidebar_settings'
import ModalNewCard from '@frontend/modals/new_card/modal_new_card'
import ModalNewCardWidget from '@frontend/modals/new_card_widget/modal_new_card_widget'
import ModalViewCardWidget from '@frontend/modals/view_card_widget/modal_view_card_widget'
import onMountBuilder from '@root/hooks/on_mount_builder'
import onSaveTemplateHook from '@root/hooks/on_save_template'
import onSaveRevisionHook from '@root/hooks/on_save_revision'
import onDeleteRevisionHook from '@root/hooks/on_delete_revision'
import ModalTemplatePublish from '@frontend/modals/template_publish/modal_template_publish'
import onPublishTemplateHook from '@root/hooks/on_publish_template'

type Props = {
   state: RootState
   dispatcher: Dispatcher
   bffRequests: Requests
   toolbarEvents: ToolbarEvents
   returnUrl: string
   flow: AppReactFlowProps
}

const BuilderReactFlow = ({state, dispatcher, bffRequests, toolbarEvents, returnUrl, flow}: Props) => {
   const {project, setViewport} = useReactFlow()

   const {base, current} = getActiveRevisions(state)
   const nodeTypes = useMemo(getNodeTypes, [])
   const {nodes, edges, setNodes, onNodesChange, setEdges, onEdgesChange} = flow

   // const {unsavedSteps, unsavedBlocks} = state.activeTemplate
   const selectedBlockId = state.activeTemplate.selectedBlock
   const selectedBlockNode = getSelectedBlock(state, nodes)

   /**
    * All generic actions and events for the builder
    **/
   const flowEvents = {
      // When clicking on a node block inside the pane
      onNodeSelect: useCallback((event: ReactMouseEvent, node: Node) => {
         // setViewport({x: node.position.x, y: node.position.y, zoom}, {duration: 800})
         dispatcher(selectBlock(node.id))
         if (!isWidgetActive(state, Widgets.TemplateBrowsePage)) {
            document.getElementById('builder-toolbar-button--template')!.click()
         }
         setNodes(_nodes => updateSelectedNodeIterator(_nodes, node.id, {draggable: true}))
      }, [state, nodes, dispatcher, setNodes]),

      // When clicking on the pane background/back
      onPaneClick: useCallback(() => {
         dispatcher(deselectBlock())
         setNodes(_nodes => updateAllNodesIterator(_nodes, {selected: false, draggable: false}))
      }, [dispatcher])
   }

   /**
    * All modal windows events
    */
   const modalEvents: ModalEvents = {
      newCard: {
         // When a block type item is clicked inside a new card modal
         onNewCardPaneClick: useCallback((parentBlock, newBlockType): void => {
            const node = newBlock(parentBlock, newBlockType)
            setNodes(prev => [...prev, node])
            setEdges(prev => [...prev, newEdge(parentBlock.id, node.id)])
            changeRevision(dispatcher, {incrementBlock: true})
            dispatcher(toggleNewCardModal(false))
         }, [setNodes, setEdges, dispatcher]),

         // When new card modal is closed
         onCloseContext: useCallback((): void => {
            dispatcher(toggleNewCardModal(false))
         }, [dispatcher])
      },
      newCardWidget: {
         // When add widget button is clicked
         onAddCardWidgetButtonClick: useCallback((slot, widget) => {
            if (selectedBlockNode && selectedBlockId) {
               const widgets = [...selectedBlockNode.data.widgets]
               // Rule 1: You can only add a widget to slot if the slot is empty, what is being checked in a slot component
               // Rule 2: Index does not correspond to widget
               widgets.push(widget)
               setNodes(_nodes => (updateNodeDataIterator(_nodes, selectedBlockId, {widgets})))
               changeRevision(dispatcher)
               dispatcher(toggleNewCardWidgetModal(false))
            }
         }, [dispatcher, selectedBlockNode, setNodes]),

         // When new widget modal is closed
         onCloseContext: useCallback((): void => {
            dispatcher(toggleNewCardWidgetModal(false))
         }, [dispatcher])
      },
      viewCardWidget: {
         // When update card widget button is clicked
         onUpdateCardWidgetButtonClick: useCallback((id, widgetProps) => {
            if (selectedBlockNode && selectedBlockId) {
               const widgets = [...selectedBlockNode.data.widgets]
               const index = widgets.findIndex(w => w.id === id)!
               widgets[index].props = widgetProps
               setNodes(_nodes => (updateNodeDataIterator(_nodes, selectedBlockId, {widgets})))
               changeRevision(dispatcher)
               dispatcher(toggleViewCardWidgetModal(false))
            }
         }, [dispatcher, selectedBlockNode, setNodes]),

         // When delete card widget button is clicked
         onDeleteCardWidgetButtonClick: useCallback((id: string) => {
            if (selectedBlockNode && selectedBlockId) {
               const widgets = [...selectedBlockNode.data.widgets]
               const index = widgets.findIndex(w => w.id === id)!
               widgets.splice(index, 1)
               setNodes(_nodes => (updateNodeWidgetsIterator(_nodes, selectedBlockId, widgets)))
               changeRevision(dispatcher)
               dispatcher(toggleViewCardWidgetModal(false))
            }
         }, [dispatcher, selectedBlockNode, setNodes]),

         // When edit widget modal is closed
         onCloseContext: useCallback((): void => {
            dispatcher(toggleViewCardWidgetModal(false))
         }, [dispatcher])
      },
      templatePublish: {
         onPublishButtonClick(templateId: string, revision: common_RevisionID, comment: string) {
            dispatcher(setAsyncProcess(AsyncProcesses.PublishTemplate, 'triggered', {templateId, revision, comment}))
         },
         // When edit widget modal is closed
         onCloseContext: useCallback((): void => {
            dispatcher(toggleTemplatePublishModal(false))
         }, [dispatcher])
      }
   }

   /**
    * All events accessible within the Sidebar component family
    **/
   const sidebarEvents: SidebarEvents = {
      templates: {
         // When `Radio` button is clicked upon picking template and revision to load
         onSelectRevisionBoxClick: useCallback((templateId, revision) => {
            const whenClickedOnNotSelected = state.selectedTemplate.id !== templateId || state.selectedTemplate.revision !== revision
            if (whenClickedOnNotSelected) {
               dispatcher(selectTemplate(templateId, revision))
            }
         }, [state, dispatcher]),

         // When `Load` button is clicked and pulls the information about the template from the backend
         onLoadButtonClick: useCallback(() => {
            dispatcher(setAsyncProcess(AsyncProcesses.PullTemplate, 'triggered'))
         }, [state, dispatcher]),

         // When `Add template` button is clicked and pulls the information about the template from the backend
         onAddButtonClick: useCallback(() => {
            // Get the Goal Block
            const canvasSize = document.getElementById('my-kue')!.getBoundingClientRect()
            const canvasCentreXY = project({
               x: canvasSize.width / 2,
               y: canvasSize.height / 2
            })
            const goalBlock = getGoalBlock(canvasCentreXY)

            // Create a revision storage with a first, active & base revision
            const storage = revisionStorageForBlankTemplate(goalBlock)

            // Prepare a new template
            const template = newTemplateItem(storage[0].revision)

            // Mark the change as unsaved
            dispatcher(resetUnsavedStepsAndBlocks(1))

            // Set up the revision information
            dispatcher(setActiveTemplateRevisions({
               current: storage[0].revision,
               base: storage[0].revision,
               published: null
            }))

            // Push to templates list
            dispatcher(createTemplate(template))

            // Refresh the template item record
            dispatcher(updateActiveTemplate(template._id, storage))
            dispatcher(setActiveTemplateAsLocal(true))

            // Set selected template
            dispatcher(selectTemplate(template._id, storage[0].revision))

            // Set nodes and edges to the active revision
            setNodes(storage[0].nodes)
            setEdges(storage[0].edges)
         }, [state, dispatcher]),

         // When `Save as new` button is clicked
         onSaveAsNewButtonClick: useCallback((label, comment?): void => {
            dispatcher(setAsyncProcess(AsyncProcesses.SaveRevision, 'triggered', {label, comment, saveAsNew: true}))
         }, [current, dispatcher]),

         onDeleteRevisionButtonClick: useCallback((templateId: string, revision: common_RevisionID) => {
            dispatcher(setAsyncProcess(AsyncProcesses.DeleteRevision, 'triggered', {templateId, revision}))
         }, [dispatcher]),

         onPublishTemplateButtonClick: useCallback((templateId: string, revision: common_RevisionID) => {
            dispatcher(toggleTemplatePublishModal(
               !isWidgetActive(state, Widgets.TemplatePublishModal),
               {templateId, revision}
            ))
         }, [state, dispatcher]),

         onSaveAsNewFormCloseButtonClick: useCallback(() => {
            dispatcher(toggleTemplatesRevisionSaveAsNewForm(false))
         }, [dispatcher])
      },
      template: {
         // When clicking on `Add a block` button in the block header toolbar
         onAddBlockButtonClick: useCallback(() => {
            unsetWidgets(state, dispatcher, WidgetGroups.Modals)
            dispatcher(toggleNewCardModal(
               !isWidgetActive(state, Widgets.NewCardModal)
            ))
         }, [state, dispatcher]),

         // When block properties editing form is submitted
         onCardDetailsSubmitButtonClick: useCallback((data): void => {
            const node = nodes.find(n => n.id === selectedBlockId)!
            if (!isEqual(node.data, data)) {
               setNodes(_nodes => (updateNodeDataIterator(_nodes, selectedBlockId!, data)))
               changeRevision(dispatcher)
            }
         }, [nodes, setNodes, state, dispatcher]),

         // When a card layout dropdown has changed
         onCardLayoutDropdownChange: useCallback((layout) => {
            if (selectedBlockId) {
               setNodes(_nodes => (updateNodeDataIterator(_nodes, selectedBlockId, {layout})))
               changeRevision(dispatcher)
            }
         }, [selectedBlockId, setNodes, dispatcher]),

         // When clicked on empty widget slot
         onCardLayoutEmptySlotButtonClick: useCallback((slot) => {
            unsetWidgets(state, dispatcher, WidgetGroups.Modals)
            dispatcher(toggleNewCardWidgetModal(true,{slot}))
         }, [state, dispatcher]),

         // When clicked on empty widget slot
         onCardLayoutSlotButtonClick: useCallback((widget) => {
            unsetWidgets(state, dispatcher, WidgetGroups.Modals)
            dispatcher(toggleViewCardWidgetModal(true,{widget}))
         }, [state, dispatcher]),

         // When the card search dropdown changes
         onCardSearchDropdownChange: useCallback((name, value) => {
            const nodeId = value!.toString()
            const _nodes = cloneDeep(nodes)
            const toBeActiveIndex = nodes.findIndex(n => n.id === nodeId)!
            const nowActiveIndex = nodes.findIndex(n => n.selected)
            if (nowActiveIndex !== -1) {
               _nodes[nowActiveIndex].selected = false
            }
            _nodes[toBeActiveIndex].selected = true
            setNodes(_nodes)
            dispatcher(selectBlock(nodeId))
         }, [nodes, dispatcher, setNodes]),

         // When in card settings tab, user clicks `delete card` button
         onCardSettingsDeleteButtonClick: useCallback((cardId) => {
            const nodesToBeRemoved: string[] = []

            function getDependentBlockIds(sourceId: string) {
               nodesToBeRemoved.push(sourceId)
               const children = edges.filter(e => e.source === sourceId)
               if (children.length > 0) {
                  children.forEach(e => getDependentBlockIds(e.target))
               }
            }
            getDependentBlockIds(cardId)
            setNodes(_nodes => (removeNodesIterator(_nodes, nodesToBeRemoved)))
            setEdges(_edges => (removeEdgesIterator(_edges, nodesToBeRemoved)))
            changeRevision(dispatcher)
         }, [state, nodes, edges, dispatcher, base]),

         // When in card settings tab, user clicks `change link` button
         onCardSettingsChangeLinkButtonClick: useCallback((selectedBlock, sourceBlockId, existingEdgeIndex) => {
            const _edges = cloneDeep(edges)
            _edges.push(newEdge(sourceBlockId, selectedBlock.id))
            _edges.splice(existingEdgeIndex, 1)
            setEdges(_edges)
            changeRevision(dispatcher)
         }, [edges, dispatcher, setEdges])
      },

      settings: {
         // When the template settings form is submitted
         onTemplateInformationFormSubmit: useCallback((payload): void => {
            dispatcher(setAsyncProcess(AsyncProcesses.SaveTemplate, 'triggered', payload))
         }, [dispatcher])
      }
   }

   /**
    * All events accessible within the Progressbar
    */
   const progressbarEvents: ProgressbarEvents = {
      onSaveButtonClick: useCallback(() => {
         if (base) {
            dispatcher(setAsyncProcess(AsyncProcesses.SaveRevision, 'triggered', {saveAsNew: false}))
         }
      }, [base, dispatcher, state]),
      onSaveAsNewButtonClick: useCallback(() => {
         if (state.activeTemplate.templateId) {
            if (!isWidgetActive(state, Widgets.TemplatesListPage)) {
               toolbarEvents.onSelectTemplatesListPageButtonClick()
            }
            dispatcher(toggleTemplatesRevisionSaveAsNewForm(true))
         }
      }, [state, dispatcher]),
      onDiscardUnsavedButtonClick: useCallback(() => {
         if (base) {
            const baseRevisionStorageItem = getBaseRevision(state)
            const local = isActiveTemplateLocal(state)
            if (baseRevisionStorageItem) {
               if (!local) {
                  // Resetting saved template to the base
                  discardRemoteTemplate(state, dispatcher)
                  setNodes(updateAllNodesIterator(baseRevisionStorageItem.nodes, {draggable: false}))
                  setEdges(baseRevisionStorageItem.edges)
               } else {
                  // Discarding the whole new local template
                  discardLocalTemplate(state, dispatcher)
                  setNodes([])
                  setEdges([])

               }
            }
         }
      }, [state, dispatcher, base, setNodes, setEdges]),
      onExitButtonClick: useCallback(() => {
         location.href = returnUrl
      }, [returnUrl])
   }

   onPullTemplateHook({
      request: bffRequests.onPullTemplate,
      state,
      dispatcher,
      setNodes,
      setEdges
   })

   onSaveTemplateHook({
      request: bffRequests.onSaveTemplate,
      state,
      dispatcher
   })

   onSaveRevisionHook({
      request: bffRequests.onSaveRevision,
      state,
      dispatcher,
      setEdges,
      setNodes,
      nodes,
      edges
   })

   onDeleteRevisionHook({
      request: bffRequests.onDeleteRevision,
      state,
      dispatcher,
      setEdges,
      setNodes
   })

   onPublishTemplateHook({
      request: bffRequests.onPublishTemplate,
      state,
      dispatcher
   })

   onSelectAnotherBlockHook({state, dispatcher})

   onDeselectBlockHook({state, dispatcher})

   onMountBuilder({state, setNodes, setEdges})

   return (
      <UI.DimmerArea
         inverted={false}
         active={isWidgetGroupBusy(state, WidgetGroups.App)}
         content={{
            header: 'A few more moments...',
            subheader: 'We are getting things ready and loading your pathway details'
         }}>
         <div className="--kue-b--layout">
            {isWidgetActive(state, Widgets.TemplatesListPage) &&
               <Sidebar page={Widgets.TemplatesListPage}>
                  <SidebarTemplates
                     state={state}
                     events={sidebarEvents.templates}
                  />
                  <ModalTemplatePublish state={state} events={modalEvents.templatePublish}/>
               </Sidebar>
            }
            {isWidgetActive(state, Widgets.TemplateBrowsePage) &&
               <Sidebar page={Widgets.TemplateBrowsePage}>
                  <SidebarTemplate
                     state={state}
                     nodes={nodes}
                     edges={edges}
                     selectedBlockNode={selectedBlockNode}
                     events={sidebarEvents.template}
                  />
                  <ModalNewCard node={selectedBlockNode} state={state} events={modalEvents.newCard}/>
                  <ModalNewCardWidget state={state} events={modalEvents.newCardWidget}/>
                  <ModalViewCardWidget state={state} events={modalEvents.viewCardWidget}/>
               </Sidebar>
            }
            {isWidgetActive(state, Widgets.TemplateSettingsPage) &&
               <UI.DimmerArea
                  inverted={false}
                  active={isWidgetGroupBusy(state, WidgetGroups.TemplateSettingsSidebar)}
                  content={{
                     header: 'Please wait...',
                     subheader: 'We are working on your template configuration'
                  }}>
                  <Sidebar page={Widgets.TemplateSettingsPage}>
                     <SidebarSettings
                        state={state}
                        events={sidebarEvents.settings}
                     />
                  </Sidebar>
               </UI.DimmerArea>
            }
            <main className="--kue-bf">
               <Progressbar
                  state={state}
                  events={progressbarEvents}
               />
               <UI.DimmerArea
                  inverted={false}
                  active={isWidgetGroupBusy(state, WidgetGroups.BuilderFlow)}
                  content={{
                     header: 'Please wait...',
                     subheader: 'We are feeding the diagram with data'
                  }}>
                  <ReactFlow
                     id="kue-builder-flow"
                     nodes={base ? nodes : []}
                     edges={base ? edges : []}
                     nodeTypes={nodeTypes}
                     onNodesChange={onNodesChange}
                     onEdgesChange={onEdgesChange}
                     onNodeClick={flowEvents.onNodeSelect}
                     onPaneClick={flowEvents.onPaneClick}
                     onNodeDragStop={flowEvents.onNodeSelect}
                     connectionMode={ConnectionMode.Strict}
                     defaultZoom={0.5}
                     minZoom={0.2}
                     maxZoom={1}
                     attributionPosition="bottom-left"
                     fitView={true}
                  >
                     <Controls/>
                     <MiniMap
                        nodeStrokeColor="#181321"
                        nodeColor="#6a75ec"
                        nodeBorderRadius={0}
                        nodeStrokeWidth={3}
                        maskColor="#2a213b"
                     />
                  </ReactFlow>
               </UI.DimmerArea>
            </main>
         </div>
      </UI.DimmerArea>
   )
}

const BuilderContainer = (props: Props): JSX.Element => {
   return (
      <ReactFlowProvider>
         <BuilderReactFlow {...props} />
      </ReactFlowProvider>
   )
}

export default BuilderContainer
