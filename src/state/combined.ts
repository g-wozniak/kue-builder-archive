import {Utils} from '@kue-space/common'
import {Dispatcher, RootState} from '@intf/State'
import {WidgetGroups} from '@root/properties'
import {
   deselectBlock,
   incrementUnsavedBlocks,
   incrementUnsavedSteps, removeTemplate, resetUnsavedStepsAndBlocks, updateActiveTemplate, setActiveTemplateAsLocal,
   setActiveTemplateRevisions,
   unsetWidgets as _unsetWidgets
} from './actions'


/**
 * unsetWidgets
 * @param state
 * @param dispatcher
 * @param group
 * @description adapter which filters whether the app UI widget is active, and turns it off only then
 */
export const unsetWidgets = (state: RootState, dispatcher: Dispatcher, group: WidgetGroups): void => {
   const activeWidgets = state.widgets.filter(w => w.group === group && w.active)
   if (activeWidgets.length > 0) {
      dispatcher(_unsetWidgets([group]))
   }
}

export const deselectBlockIfSelected = (state: RootState, dispatcher: Dispatcher) => {
   const selectedBlock = state.activeTemplate.selectedBlock
   if (selectedBlock) {
      dispatcher(deselectBlock());
      (document.getElementsByClassName('react-flow__pane')[0] as HTMLElement).click()
   }
}

export const discardRemoteTemplate = (state: RootState, dispatcher: Dispatcher) => {
   dispatcher(setActiveTemplateRevisions({current: state.activeTemplate.base}))
   dispatcher(resetUnsavedStepsAndBlocks())
   deselectBlockIfSelected(state, dispatcher)
}

export const discardLocalTemplate = (state: RootState, dispatcher: Dispatcher) => {
   dispatcher(setActiveTemplateRevisions({
      current: null,
      base: null,
      published: null
   }))
   dispatcher(removeTemplate(state.activeTemplate.templateId!))
   dispatcher(updateActiveTemplate(null, []))
   dispatcher(setActiveTemplateAsLocal(false))
   dispatcher(resetUnsavedStepsAndBlocks())
   document.getElementById('builder-toolbar-button--templates')!.click()
   deselectBlockIfSelected(state, dispatcher)
}

/**
 * changeRevision
 * @description all steps necessary to update revision in the front-end
 * @param dispatcher
 * @param payload
 */

type ChangeRevisionPayload = {
   incrementBlock?: boolean
}

export const changeRevision = (dispatcher: Dispatcher, payload?: ChangeRevisionPayload): void => {
   dispatcher(setActiveTemplateRevisions({current: Utils.createRevisionId()}))
   dispatcher(incrementUnsavedSteps())
   if (payload && payload.incrementBlock) {
      dispatcher(incrementUnsavedBlocks())
   }
}
