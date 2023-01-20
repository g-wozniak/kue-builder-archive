import {AsyncProcesses, WidgetGroups, Widgets} from '@root/properties'
import {
   Action,
   CombinedTemplateItem,
   StateAsyncProcess,
   StateRevisionStorage,
   StateTemplateItem,
   StateWidget
} from '@intf/State'
import {common_RevisionID, common_WantToBeRevisionID, KeyAny} from '@kue-space/common'
import {AsyncProcessLifecycle} from '@intf/Common'
import {ModalNewCardWidgetProps, ModalTemplatePublishProps, ModalViewCardWidgetProps} from '@intf/Modal'

// --- actions ---

export enum Actions {
   setAsyncProcess = 'setAsyncProcess',
   setActiveTemplateRevisions = 'setActiveTemplateRevisions',
   updateActiveTemplate = 'updateActiveTemplate',
   setActiveTemplateAsLocal = 'setActiveTemplateAsLocal',
   selectTemplate = 'selectTemplate',
   deselectTemplate = 'deselectTemplate',
   createTemplate = 'createTemplate',
   updateTemplate = 'updateTemplate',
   removeTemplate = 'removeTemplate',
   activateRevision = 'activateRevision',
   removeRevision = 'removeRevision',
   insertRevision = 'insertRevision',
   updateRevision = 'updateRevision',
   updateRevisionDescription = 'updateRevisionDescription',
   selectBlock = 'selectBlock',
   deselectBlock = 'deselectBlock',
   setWidget = 'setWidget',
   unsetWidgets = 'unsetWidgets',
   incrementUnsavedBlocks = 'incrementUnsavedBlocks',
   incrementUnsavedSteps = 'incrementUnsavedSteps',
   resetUnsavedStepsAndBlocks = 'resetUnsavedStepsAndBlocks'
}

// --- intf ---

export type SetActiveTemplateRevisionsActionPayload = {
   current?: common_WantToBeRevisionID
   published?: common_WantToBeRevisionID
   base?: common_WantToBeRevisionID
}

export type UnsetWidgetsActionPayload = {
   groups: string[]
}

export type SelectTemplateActionPayload = {
   id: string
   revision: common_RevisionID
}

export type UpdateTemplateActionPayload = {
   id: string
   template: Partial<StateTemplateItem>
}

export type UpdateRevisionActionPayload = {
   revision: common_RevisionID
   item: CombinedTemplateItem
}

export type UpdateRevisionDescriptionActionPayload = {
   revision: common_RevisionID
   label?: string
   comment?: string
}

export type UpdateActiveTemplateActionPayload = {
   id: common_WantToBeRevisionID
   storage: StateRevisionStorage
}

export type RemoveRevisionActionPayload = {
   id: string
   revision: common_RevisionID
}

// --- impl ---

export const setAsyncProcess = (processId: AsyncProcesses, lifecycle: AsyncProcessLifecycle, payload: KeyAny = {}): Action<StateAsyncProcess> => {
   return {
      type: Actions.setAsyncProcess,
      payload: {
         id: processId,
         lifecycle,
         payload
      }
   }
}

export const createTemplate = (template: StateTemplateItem): Action<StateTemplateItem> => {
   return {
      type: Actions.createTemplate,
      payload: template
   }
}

export const updateTemplate = (id: string, template: Partial<StateTemplateItem>): Action<UpdateTemplateActionPayload> => {
   return {
      type: Actions.updateTemplate,
      payload: {id, template}
   }
}

export const updateActiveTemplate = (id: common_WantToBeRevisionID, storage: StateRevisionStorage): Action<UpdateActiveTemplateActionPayload> => {
   return {
      type: Actions.updateActiveTemplate,
      payload: {
         id,
         storage
      }
   }
}

export const removeTemplate = (id: string): Action<string> => {
   return {
      type: Actions.removeTemplate,
      payload: id
   }
}

export const setActiveTemplateAsLocal = (sw: boolean): Action<boolean> => {
   return {
      type: Actions.setActiveTemplateAsLocal,
      payload: sw
   }
}

export const setActiveTemplateRevisions = (payload: SetActiveTemplateRevisionsActionPayload): Action<SetActiveTemplateRevisionsActionPayload> => {
   return {
      type: Actions.setActiveTemplateRevisions,
      payload
   }
}

export const activateRevision = (revision: common_RevisionID): Action<common_RevisionID> => {
   return {
      type: Actions.activateRevision,
      payload: revision
   }
}

export const removeRevision = (id: string, revision: common_RevisionID): Action<RemoveRevisionActionPayload> => {
   return {
      type: Actions.removeRevision,
      payload: {id, revision}
   }
}

export const insertRevision = (item: CombinedTemplateItem): Action<CombinedTemplateItem> => {
   return {
      type: Actions.insertRevision,
      payload: item
   }
}

export const updateRevision = (revision: common_RevisionID, item: CombinedTemplateItem): Action<UpdateRevisionActionPayload> => {
   return {
      type: Actions.updateRevision,
      payload: {
         revision,
         item
      }
   }
}

export const updateRevisionDescription = (revision: common_RevisionID, {label, comment}: {label?: string, comment?: string}): Action<UpdateRevisionDescriptionActionPayload> => {
   return {
      type: Actions.updateRevisionDescription,
      payload: {
         revision,
         label,
         comment
      }
   }
}

export const selectTemplate = (id: string, revision: common_RevisionID): Action<SelectTemplateActionPayload> => {
   return {
      type: Actions.selectTemplate,
      payload: {
         id,
         revision
      }
   }
}

export const deselectTemplate = (): Action<void> => {
   return {
      type: Actions.deselectTemplate
   }
}

export const selectBlock = (blockId: string): Action<string> => {
   return {
      type: Actions.selectBlock,
      payload: blockId
   }
}

export const deselectBlock = (): Action<void> => {
   return {
      type: Actions.deselectBlock
   }
}

export const unsetWidgets = (groups: WidgetGroups[]): Action<UnsetWidgetsActionPayload> => {
   return {
      type: Actions.unsetWidgets,
      payload: {
         groups
      }
   }
}

export const toggleWidget = (widget: Widgets, group: WidgetGroups, active: boolean, props?: KeyAny): Action<StateWidget> => {
   return {
      type: Actions.setWidget,
      payload: {
         id: widget,
         group,
         active,
         props: props || {}
      }
   }
}

export const toggleCardsListPage = (active: boolean) =>
   toggleWidget(Widgets.CardsListPage, WidgetGroups.CardsListPageLayout, active)

export const toggleTemplatesListPage = (active: boolean) =>
   toggleWidget(Widgets.TemplatesListPage, WidgetGroups.BuilderLayout, active)

export const toggleTemplateBrowsePage = (active: boolean) =>
   toggleWidget(Widgets.TemplateBrowsePage, WidgetGroups.BuilderLayout, active)

export const toggleTemplateSettingsPage = (active: boolean) =>
   toggleWidget(Widgets.TemplateSettingsPage, WidgetGroups.BuilderLayout, active)

export const toggleNewCardModal = (active: boolean) =>
   toggleWidget(Widgets.NewCardModal, WidgetGroups.Modals, active)

export const toggleNewCardWidgetModal = (active: boolean, props?: ModalNewCardWidgetProps) =>
   toggleWidget(Widgets.NewCardWidgetModal, WidgetGroups.Modals, active, props)

export const toggleViewCardWidgetModal = (active: boolean, props?: ModalViewCardWidgetProps) =>
   toggleWidget(Widgets.ViewCardWidgetModal, WidgetGroups.Modals, active, props)

export const toggleTemplatesRevisionSaveAsNewForm = (active: boolean) =>
   toggleWidget(Widgets.TemplatesRevisionSaveAsNewForm, WidgetGroups.RevisionSaveAsNewForm, active)

export const toggleTemplatePublishModal = (active: boolean, props?: ModalTemplatePublishProps) =>
   toggleWidget(Widgets.TemplatePublishModal, WidgetGroups.Modals, active, props)

export const incrementUnsavedBlocks = (): Action<void> => ({
   type: Actions.incrementUnsavedBlocks
})

export const incrementUnsavedSteps = (): Action<void> => ({
   type: Actions.incrementUnsavedSteps
})

export const resetUnsavedStepsAndBlocks = (value = 0): Action<number> => ({
   type: Actions.resetUnsavedStepsAndBlocks,
   payload: value
})