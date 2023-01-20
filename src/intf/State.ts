import {common_RevisionID, common_WantToBeRevisionID, KeyAny, TModels, TPayloads} from '@kue-space/common'
import {Edge, Node} from 'react-flow-renderer'
import {AsyncProcessLifecycle} from '@intf/Common'
import {AsyncProcesses, WidgetGroups} from '@root/properties'

export interface Action<Payload> {
   type: string // Actions enum
   payload?: Payload
}

export type Dispatcher = (action: Action<any>) => void

export interface RootState {
   templates: StateTemplates
   selectedTemplate: StateSelectedTemplate
   activeTemplate: StateActiveTemplate
   widgets: StateWidgets
   processes: StateAsyncProcess[]
}

export type StateSelectedTemplate = {
   id: string | null
   revision: common_WantToBeRevisionID
}

export type StateActiveTemplate = {
   templateId: string | null
   local: boolean
   published: common_WantToBeRevisionID
   current: common_WantToBeRevisionID
   base: common_WantToBeRevisionID
   storage: StateRevisionStorage
   unsavedSteps: number
   unsavedBlocks: number
   selectedBlock: common_WantToBeRevisionID
}

export type StateTemplates = StateTemplateItem[]
export type StateTemplateItem = TPayloads.TUserProfileTemplateFragment
export type StateTemplateItemRevision = TPayloads.TUserProfileTreeRevisionFragment

export type CombinedTemplateItem = TModels.TreeRevision<Node, Edge>

export type StateWidgets = StateWidget[]
export type StateWidget = {
   id: string
   blockId?: string
   group: string
   props: KeyAny
   active: boolean
}

export type StateRevisionStorage = StateRevisionStorageItem[]
export interface StateRevisionStorageItem {
   revision: common_RevisionID
   nodes: Node[]
   edges: Edge[]
}

export type StateAsyncProcess<Payload = any> = {
   id: AsyncProcesses
   lifecycle: AsyncProcessLifecycle
   payload: Payload
   widgets?: WidgetGroups[]
}