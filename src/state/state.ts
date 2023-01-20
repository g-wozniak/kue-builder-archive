import {Dispatch, SetStateAction, useState} from 'react'
import {common_RevisionID, TPayloads} from '@kue-space/common'
import cloneDeep from 'lodash/cloneDeep'
import {Action, CombinedTemplateItem, RootState, StateAsyncProcess, StateTemplateItem, StateWidget} from '@intf/State'
import {
   Actions,
   RemoveRevisionActionPayload,
   SelectTemplateActionPayload,
   SetActiveTemplateRevisionsActionPayload,
   UnsetWidgetsActionPayload,
   UpdateActiveTemplateActionPayload,
   UpdateRevisionActionPayload, updateRevisionDescription, UpdateRevisionDescriptionActionPayload,
   UpdateTemplateActionPayload
} from '@state/actions'
import {AsyncProcesses, WidgetGroups} from '@root/properties'
import {getActiveTemplateIndex, getActiveTemplateRevisionIndex} from '@state/selectors'

export const initialState: RootState = {
   templates: [],
   selectedTemplate: {
      id: null,
      revision: null
   },
   activeTemplate: {
      templateId: null,
      local: false,
      published: null, /* Currently published revision */
      current: null, /* Current revision at which user has progressed since loading the base */
      base: null, /* Base revision to determine which diagram to initially load */
      storage: [],
      unsavedSteps: 0,
      unsavedBlocks: 0,
      selectedBlock: null
   },
   widgets: [],
   processes: [
      {
         id: AsyncProcesses.PullTemplate,
         lifecycle: 'idle',
         payload: {},
         widgets:  [WidgetGroups.BuilderFlow]
      },
      {
         id: AsyncProcesses.SaveTemplate,
         lifecycle: 'idle',
         payload: {},
         widgets: [WidgetGroups.TemplateSettingsSidebar]
      },
      {
         id: AsyncProcesses.SaveRevision,
         lifecycle: 'idle',
         payload: {},
         widgets: [WidgetGroups.MixedSavingRevision]
      },
      {
         id: AsyncProcesses.DeleteRevision,
         lifecycle: 'idle',
         payload: {},
         widgets: [WidgetGroups.MixedSavingRevision]
      },
      {
         id: AsyncProcesses.PublishTemplate,
         lifecycle: 'idle',
         payload: {},
         widgets: [WidgetGroups.Modals]
      }
   ]
}

export const useAppState = (userProfile: TPayloads.TUserProfileFromBackendPayload) => {
   return useState({
      ...initialState,
      templates: userProfile?.templates || []
   })
}

export const dispatch = (setter: Dispatch<SetStateAction<RootState>>, action: Action<any>): void => {
   console.log(action)
   setter(prevState => {
      const state = cloneDeep(prevState)
      switch (action.type) {
         case Actions.setWidget: {
            const payload = action.payload as StateWidget
            state.widgets = state.widgets.filter(w => w.group !== payload.group && w.id !== payload.id)
            state.widgets.push({...payload})
            return state
         }
         case Actions.setAsyncProcess: {
            const {id, payload, lifecycle} = action.payload as StateAsyncProcess
            const index = state.processes.findIndex(p => p.id === id)
            if (index === -1) {
               throw new Error('Every async process must be initialised in the state')
            }
            state.processes[index].lifecycle = lifecycle
            state.processes[index].payload = payload
            return state
         }
         case Actions.createTemplate: {
            const template = action.payload as StateTemplateItem
            state.templates.unshift(template)
            return state
         }
         case Actions.removeTemplate: {
            const templateId = action.payload as string
            const index = state.templates.findIndex(t => t._id === templateId)!
            state.templates.splice(index, 1)
            return state
         }
         case Actions.updateTemplate: {
            const {id, template} = action.payload as UpdateTemplateActionPayload
            const index = state.templates.findIndex(t => t._id === id)
            if (index !== -1) {
               state.templates[index] = {
                  ...state.templates[index],
                  ...template
               }
            }
            return state
         }
         case Actions.setActiveTemplateRevisions: {
            const payload = action.payload as SetActiveTemplateRevisionsActionPayload
            for (const key in payload) {
               state.activeTemplate[key] = payload[key]
            }
            return state
         }
         case Actions.updateActiveTemplate: {
            const {id, storage} = action.payload as UpdateActiveTemplateActionPayload
            state.activeTemplate.templateId = id
            state.activeTemplate.storage = storage
            return state
         }
         case Actions.setActiveTemplateAsLocal: {
            state.activeTemplate.local = action.payload as boolean
            return state
         }
         case Actions.insertRevision: {
            const item = action.payload as CombinedTemplateItem
            const activeTemplateIndex = getActiveTemplateIndex(state)
            state.activeTemplate.storage.push({
               revision: item.revision,
               nodes: item.nodes,
               edges: item.edges
            })
            state.templates[activeTemplateIndex].revisions.push({
               revision: item.revision,
               label: item.label,
               comment: item.comment,
               timestamp: item.timestamp,
               nodes: item.nodes.length
            })
            return state
         }

         case Actions.updateRevision: {
            const {revision, item} = action.payload as UpdateRevisionActionPayload
            const activeStorageRevisionIndex = state.activeTemplate.storage.findIndex(r => r.revision === revision)
            const activeTemplateIndex = getActiveTemplateIndex(state)
            const activeTemplateRevisionIndex = getActiveTemplateRevisionIndex(state, revision)
            if (activeStorageRevisionIndex !== -1 && activeTemplateRevisionIndex !== -1) {
               state.activeTemplate.storage[activeStorageRevisionIndex] = {
                  revision: item.revision,
                  nodes: item.nodes,
                  edges: item.edges
               }
               state.templates[activeTemplateIndex].revisions[activeTemplateRevisionIndex] = {
                  revision: item.revision,
                  label: item.label,
                  comment: item.comment,
                  timestamp: item.timestamp,
                  nodes: item.nodes.length
               }
            }
            return state
         }
         case Actions.updateRevisionDescription: {
            const {revision, label, comment} = action.payload as UpdateRevisionDescriptionActionPayload
            const activeTemplateIndex = getActiveTemplateIndex(state)
            const activeTemplateRevisionIndex = getActiveTemplateRevisionIndex(state, revision) // this is why revision must be active before publish, if you need to change that, provide templateId here
            if (activeTemplateIndex !== -1 && activeTemplateRevisionIndex !== -1) {
               if (label) {
                  state.templates[activeTemplateIndex].revisions[activeTemplateRevisionIndex].label = label
               }
               if (comment) {
                  state.templates[activeTemplateIndex].revisions[activeTemplateRevisionIndex].comment = comment
               }
            }
            return state
         }
         case Actions.activateRevision: {
            const toBeActiveRevision = action.payload as common_RevisionID
            state.selectedTemplate.revision = toBeActiveRevision
            state.activeTemplate.current = toBeActiveRevision
            state.activeTemplate.base = toBeActiveRevision
            state.activeTemplate.local = false
            state.activeTemplate.published = toBeActiveRevision
            return state
         }
         case Actions.removeRevision: {
            const {id, revision} = action.payload as RemoveRevisionActionPayload
            const templateIndex = state.templates.findIndex(t => t._id === id)
            if (templateIndex !== -1 && revision) {
               const revisionIndex = state.templates[templateIndex].revisions.findIndex(rev => rev.revision === revision)
               if (revisionIndex !== -1) {
                  state.templates[templateIndex].revisions.splice(revisionIndex, 1)
               }
            }
            return state
         }
         case Actions.unsetWidgets: {
            const {groups} = action.payload as UnsetWidgetsActionPayload
            state.widgets = state.widgets.filter(w => !groups.includes(w.group))
            return state
         }
         case Actions.selectTemplate: {
            const {id, revision} = action.payload as SelectTemplateActionPayload
            state.selectedTemplate.id = id
            state.selectedTemplate.revision = revision
            return state
         }
         case Actions.deselectTemplate: {
            if (state.selectedTemplate.id === state.activeTemplate.templateId) {
               state.activeTemplate = initialState.activeTemplate
            }
            state.selectedTemplate.id = null
            state.selectedTemplate.revision = null
            return state
         }
         case Actions.selectBlock: {
            state.activeTemplate.selectedBlock = action.payload as string
            return state
         }
         case Actions.deselectBlock: {
            state.activeTemplate.selectedBlock = null
            return state
         }
         case Actions.incrementUnsavedSteps: {
            state.activeTemplate.unsavedSteps += 1
            return state
         }
         case Actions.incrementUnsavedBlocks: {
            state.activeTemplate.unsavedBlocks += 1
            return state
         }
         case Actions.resetUnsavedStepsAndBlocks: {
            const value = action.payload as number
            state.activeTemplate.unsavedBlocks = value
            state.activeTemplate.unsavedSteps = value
            return state
         }
         default:
            return state
      }
   })
}