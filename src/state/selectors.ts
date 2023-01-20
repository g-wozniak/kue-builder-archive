import {Node} from 'react-flow-renderer/nocss'
import {common_RevisionID, common_WantToBeRevisionID} from '@kue-space/common'
import {RootState, StateAsyncProcess, StateRevisionStorageItem} from '@intf/State'
import {Revisions, SelectedBlock} from '@intf/Common'
import {AsyncProcesses, WidgetGroups, Widgets} from '@root/properties'

export const getAsyncProcess = (state: RootState, processId: AsyncProcesses): StateAsyncProcess => state.processes.find(p => p.id === processId)!

export const getSelectedBlock = (state: RootState, nodes: Node[]) => nodes.find(n => n.id === state.activeTemplate.selectedBlock) as SelectedBlock | undefined

export const getRevisionStorageItem = (state: RootState, revision: common_WantToBeRevisionID): StateRevisionStorageItem | undefined => state.activeTemplate.storage.find(rev => rev.revision === revision)

export const getActiveRevisionStorageItem = (state: RootState) => getRevisionStorageItem(state, state.activeTemplate.base)

export const getBaseRevision = (state: RootState) => state.activeTemplate.storage.find(rev => rev.revision === state.activeTemplate.base)

export const getActiveTemplateActiveRevision = (state: RootState) => state.templates.find(t => t._id === state.activeTemplate.templateId)?.revisions.find(r => r.revision === state.activeTemplate.base)

export const getActiveTemplateRevisionIndex = (state: RootState, revision: common_RevisionID) => state.templates.find(t => t._id === state.activeTemplate.templateId)!.revisions.findIndex(r => r.revision === revision)

export const getTemplateItem = (state: RootState, templateId: string) => state.templates.find(t => t._id === templateId)

export const getActiveTemplateItem = (state: RootState) => state.templates.find(t => t._id === state.activeTemplate.templateId)

export const getActiveTemplateIndex = (state: RootState) => state.templates.findIndex(t => t._id === state.activeTemplate.templateId)

export const getActiveRevisions = (state: RootState) => ({
   published: state.activeTemplate.published,
   current: state.activeTemplate.current,
   base: state.activeTemplate.base
} as Revisions)

export const isActiveTemplateSaved = (state: RootState) => state.activeTemplate.unsavedSteps + state.activeTemplate.unsavedBlocks === 0

export const isActiveTemplateLocal = (state: RootState) => state.activeTemplate.local

export const isWidgetActive = (state: RootState, widgetId: Widgets): boolean => !!state.widgets.find(w => w.id === widgetId && w.active)

export const isWidgetGroupActive = (state: RootState, widgetGroup: WidgetGroups): boolean => !!state.widgets.find(w => w.group === widgetGroup && w.active)

export const isWidgetGroupBusy = (state: RootState, widgetGroup: WidgetGroups): boolean => !!state.processes.find(p => p.widgets?.includes(widgetGroup) && p.lifecycle === 'triggered')

export const getWidgetProps = (state: RootState, widgetId: Widgets): any | undefined => {
   const el = state.widgets.find((w => w.id === widgetId))
   return el ? el.props : undefined
}