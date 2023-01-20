import {RootState, StateRevisionStorageItem, StateTemplateItemRevision} from '@intf/State'
import {TModels} from '@kue-space/common'

export type ProgressbarProps = {
   state: RootState
   events: ProgressbarEvents
}

export type ProgressbarVersionProps = {
   state: RootState
   version: TModels.TemplateItemVersion
   templateRevision: StateTemplateItemRevision | undefined
}

export type ProgressbarButtonsProps = ProgressbarProps & {
   version: TModels.TemplateItemVersion
   templateRevision: StateTemplateItemRevision | undefined
}

export type ProgressbarStats = {
   templateRevision: StateTemplateItemRevision | undefined
   storageRevision: StateRevisionStorageItem | undefined
   version: TModels.TemplateItemVersion
}

export interface ProgressbarEvents {
   onSaveButtonClick(): void
   onSaveAsNewButtonClick(): void
   onDiscardUnsavedButtonClick(): void
   onExitButtonClick(): void
}