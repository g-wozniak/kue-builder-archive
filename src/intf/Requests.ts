import {BFFResolvedResponse, common_RevisionID, TPayloads} from '@kue-space/common'
import {StateAsyncProcess} from '@intf/State'

/**
 * Requests
 * @description all the external events that are coming to the Builder from the outside
 */

export type TemplateRequest = (payload: TPayloads.TTemplateToBackendPayload) => Promise<BFFResolvedResponse<TPayloads.TTemplateFromBackendPayload>>
export type TemplateRevisionSaveRequest = ({templateId, revision}: TPayloads.TTemplateRevisionSaveToBackendPayload) => Promise<BFFResolvedResponse<void>>

export type TemplateSaveRequest = ({templateId, amendedTemplate}: TPayloads.TTemplateSaveToBackendPayload) => Promise<BFFResolvedResponse<void>>
export type TemplateRevisionDeleteRequest = ({templateId, revisionId}: TPayloads.TTemplateRevisionDeleteToBackendPayload) => Promise<BFFResolvedResponse<void>>
export type TemplatePublishRequest = ({templateId, version}: TPayloads.TTemplatePublishToBackendPayload) => Promise<BFFResolvedResponse<TPayloads.TTemplatePublishFromBackendPayload>>

export type OnPullTemplateAsyncProcess = StateAsyncProcess<void>
export type OnDeleteRevisionAsyncProcess = StateAsyncProcess<{templateId: string, revision: common_RevisionID}>
export type OnSaveRevisionAsyncProcess = StateAsyncProcess<{label?: string, comment?: string, saveAsNew: boolean}>
export type OnSaveTemplateAsyncProcess = StateAsyncProcess<TPayloads.TTemplateAmendablePayload>
export type OnPublishTemplateAsyncProcess = StateAsyncProcess<{templateId: string, revision: common_RevisionID, comment: string}>

export type Requests = {
   onPullTemplate: TemplateRequest
   onSaveTemplate: TemplateSaveRequest
   onSaveRevision: TemplateRevisionSaveRequest
   onDeleteRevision: TemplateRevisionDeleteRequest
   onPublishTemplate: TemplatePublishRequest
}

