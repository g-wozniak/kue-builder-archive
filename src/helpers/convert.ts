import {
   BlockDataProps, CardWidgets,
   common_CardLayouts,
   common_CardTypes,
   common_CardWidgets,
   common_Difficulties,
   common_RevisionID,
   KeyAny,
   TemplateModel,
   TModels, TPayloads,
   Utils
} from '@kue-space/common'
import {Edge, Node, NodeProps, NodeTypes, Position, XYPosition} from 'react-flow-renderer'

import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

import config from '@root/config'
import Card from '@frontend/common/card/card'

import {CombinedTemplateItem, StateRevisionStorage, StateRevisionStorageItem, StateTemplateItem} from '@intf/State'
import {AmendableBlockDataProps} from '@intf/Common'
import {getDummyTemplateId, getDummyTemplateSlug} from '@kue-space/common/helpers/dummy'


/**
 * revisionToTreeRevision
 * @description converts the revision storage item to the tree revision which can be then saved in the database
 * @param revision {CombinedTemplateItem}
 * */
export const revisionToTreeRevision = (revision: CombinedTemplateItem): TModels.TreeRevision<TPayloads.TTemplateTreeNodeSaveItem, TModels.TreeEdge> => {
   const treeNodes = revision.nodes.map(n => {
      const treeNode: TPayloads.TTemplateTreeNodeSaveItem = {
         _id: n.id,
         cardType: n.type as common_CardTypes,
         customCardType: n.data.extraCardType,
         position: {
            x: n.position.x,
            y: n.position.y
         },
         label: n.data.label,
         description: n.data.description,
         time: n.data.time,
         cost: n.data.cost,
         difficulty: n.data.difficulty,
         layout: n.data.layout,
         widgets: n.data.widgets
      }
      return treeNode
   })

   const treeEdges = revision.edges.map(e => ({
      _id: e.id,
      source: e.source,
      target: e.target
   }))

   return {
      revision: revision.revision,
      label: revision.label,
      comment: revision.comment,
      timestamp: revision.timestamp,
      nodes: treeNodes,
      edges: treeEdges
   }
}

export const templateToRevisionStorage = (template: TemplateModel, activeRevision?: common_RevisionID): [StateRevisionStorage, number] => {

   function treeNodeToReactFlowNode(treeNode: TModels.TreeNode): Node {
      const data: BlockDataProps = {
         label: treeNode.label,
         description: treeNode.description,
         customCardType: treeNode.customCardType,
         time: treeNode.time,
         cost: treeNode.cost,
         layout: treeNode.layout,
         difficulty: treeNode.difficulty,
         widgets: treeNode.widgets || []
      }
      return {
         id: treeNode._id,
         position: treeNode.position,
         data,
         type: treeNode.cardType,
         hidden: false,
         selected: false,
         draggable: false,
         selectable: true,
         connectable: true
         // style?: CSSProperties;
         // className?: string;
         // dragHandle?: string;
         // parentNode?: string;
         // zIndex?: number;
         // extent?: 'parent' | CoordinateExtent;
         // expandParent?: boolean;
         // positionAbsolute?: XYPosition;
         // z?: number;
         // handleBounds?: NodeHandleBounds;
         // isParent?: boolean;
      }
   }

   function treeEdgeToReactFlowEdge(treeEdge: TModels.TreeEdge): Edge {
      return {
         id: treeEdge._id,
         source: treeEdge.source,
         target: treeEdge.target
      }
   }

   let activeRevIndex = 0
   const published = template.getVersion().revision
   // ???
   const storage = template.getTree().map((rev) => ({
      revision: rev.revision,
      edges: rev.edges.map(e => treeEdgeToReactFlowEdge(e)),
      nodes: rev.nodes.map(n => treeNodeToReactFlowNode(n))
   }))

   if (activeRevision) {
      activeRevIndex = storage.findIndex(rev => rev.revision === activeRevision)
   } else if (published) {
      // There should be no case when published revision does not exist in this object
      activeRevIndex = storage.findIndex(rev => rev.revision === published)
   }

   return [storage, activeRevIndex]
}

export const revisionStorageForBlankTemplate = (goalBlock: Node): StateRevisionStorageItem[] => {
   return [
      {
         revision: Utils.createRevisionId(),
         nodes: [goalBlock],
         edges: []
      }
   ]
}

export const newTemplateItem = (revision: common_RevisionID): StateTemplateItem => {
   return {
      _id: getDummyTemplateId('aaaa'),
      name: '(my new pathway)',
      headline: 'just recently added pathway...',
      description: 'this is going to be an amazing journey...',
      slug: getDummyTemplateSlug(),
      version: {
         major: 0,
         comment: '',
         revision: null,
         published: null
      },
      revisions: [
         {
            revision,
            label: config.firstChange.label,
            comment: config.firstChange.comment,
            timestamp: Utils.timestamp(),
            nodes: 1
         }
      ],
      created: new Date().toISOString()
   }
}

export const newBlock = (parentBlock: Node, newBlockType: string): Node => {
   const blockConfig = config.blocks[newBlockType]
   const data: BlockDataProps = {
      label: blockConfig.onInsert.caption,
      description: blockConfig.onInsert.description,
      time: 0,
      cost: 0,
      difficulty: common_Difficulties.None,
      layout: common_CardLayouts.None,
      widgets: []
   }

   return {
      id: Utils.uid(),
      position: {
         x: parentBlock.position.x + config.blockOffset.x,
         y: parentBlock.position.y + config.blockOffset.y
      },
      data,
      type: newBlockType,
      hidden: false,
      selected: false,
      draggable: false,
      selectable: true,
      connectable: true
   }
}

export const newEdge = (originId: string, targetId: string): Edge => {
   return {
      id: `${originId}-${targetId}`,
      source: originId,
      target: targetId
   }
}

export const getGoalBlock = (canvasCentreXY: XYPosition): Node => {
   const {id, initialPositionX, blockWidth, blockHeight} = config.goal
   const pos: XYPosition = {
      x: initialPositionX,
      y: canvasCentreXY.y - blockHeight / 2
   }
   const blockConfig = config.blocks[common_CardTypes.Goal]
   const data: BlockDataProps = {
      label: blockConfig.caption,
      description: blockConfig.description,
      time: 0,
      cost: 0,
      difficulty: common_Difficulties.None,
      layout: common_CardLayouts.Single,
      widgets: [
         {
            id: 'text-widget-goal',
            widget: common_CardWidgets.Text,
            slot: 1,
            props: {
               caption: blockConfig.caption,
               text: config.goal.widget
            }
         }
      ]
   }
   return {
      id,
      type: common_CardTypes.Goal,
      position: {x: pos.x, y: pos.y},
      width: blockWidth,
      height: blockHeight,
      data,
      targetPosition: Position.Bottom,
      draggable: false,
      selectable: true,
      connectable: true
   }
}

export const getNodeTypes = (): NodeTypes => {
   const nodeTypes: KeyAny = {}
   Object.keys(config.blocks).forEach(cardType => {
      nodeTypes[cardType] = (props: NodeProps) => Card({...props, type: cardType, ...config.blocks[cardType]})
   })
   return nodeTypes
}

export const updateAllNodesIterator = (nodes: Node[], properties: Partial<Node>): Node[] => {
   const _properties = cloneDeep(properties)
   return nodes.map(node => ({...node, ..._properties}))
}

export const updateSelectedNodeIterator = (nodes: Node[], selectedBlockId: string, properties: Partial<Node>): Node[] => {
   const index = nodes.findIndex(node => node.id === selectedBlockId)
   if (index !== -1) {
      nodes[index] = merge(cloneDeep(nodes[index]), cloneDeep(properties))
   }
   return nodes
}


export const updateNodeDataIterator = (nodes: Node[], selectedBlockId: string, data: AmendableBlockDataProps): Node[] => {
   return nodes.map((_node) => {
      if (_node.id === selectedBlockId) {
         _node.data = merge(cloneDeep(_node.data), data)
      }
      return _node
   })
}

export const updateNodeWidgetsIterator = (nodes: Node<BlockDataProps>[], selectedBlockId: string, widgets: CardWidgets): Node[] => {
   return nodes.map((_node) => {
      if (_node.id === selectedBlockId) {
         _node.data.widgets = cloneDeep(widgets)
      }
      return _node
   })
}

export const removeNodesIterator = (nodes: Node[], nodesToBeRemoved: string[]): Node[] => {
   const _nodes: Node[] = []
   nodes.forEach(_node => {
      if (!nodesToBeRemoved.includes(_node.id)) {
         _nodes.push(_node)
      }
   })
   return _nodes
}

export const removeEdgesIterator = (edges: Edge[], removedNodes: string[]): Edge[] => {
   const _edges: Edge[] = []
   edges.forEach(_edge => {
      if (!removedNodes.includes(_edge.source) && !removedNodes.includes(_edge.target)) {
         _edges.push(_edge)
      }
   })
   return _edges
}

