import {
   BFFResolvedResponse,
   FromBackendPayload,
   KeyAny,
   TemplateDummyModel, TemplateFromBackendPayload, TPayloads,
   UserProfileFromBackendDummyPayload,
   Utils
} from '@kue-space/common'
import KueBuilderApp from '@root/app'
import * as React from 'react'

const mockedResolvedApiResponse = (data: KeyAny | null = null, message?: string): BFFResolvedResponse<any> => {
   const payload = new FromBackendPayload(data, message)
   return {
      status: 200,
      headers: {},
      statusText: 'ok',
      method: 'POST',
      responseType: 'json',
      timeout: 3000,
      baseURL: 'localhost:3000',
      data: payload.getPayload(),
      url: 'http://localhost:3000/api/endpoint/url'
   }
}

/*
const resolvedApiResponse = (response: any): BFFResolvedResponse<any> => {

}*/

const templates = [
   new TemplateDummyModel({published: true, revisions: ['101-266', '110-292']}),
   new TemplateDummyModel({revisions: ['101-266', '201-320', '912-902']}, {_id: Utils.getDummyTemplateId('1001')})
]
const mockedProfilePayload = new UserProfileFromBackendDummyPayload({}, {templates})


const bffMockedRequests = {
   onPullTemplate: ({templateId}: TPayloads.TTemplateToBackendPayload): Promise<BFFResolvedResponse<TPayloads.TTemplateFromBackendPayload>> => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            console.log(`Obtaining template details for ${templateId}`)
            let template = templates.find(t => t.getId() === templateId)!
            if (!template) {
               // In case you want to re-load the newly created template
               template = new TemplateDummyModel({published: false, revisions: 1}, {_id: templateId})
            }
            resolve(mockedResolvedApiResponse(new TemplateFromBackendPayload(template).getData()))
         }, 700)
      })
   },
   onSaveTemplate: ({templateId, amendedTemplate}: TPayloads.TTemplateSaveToBackendPayload): Promise<BFFResolvedResponse<void>> => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            console.log('Template saved')
            console.log(amendedTemplate)
            resolve(mockedResolvedApiResponse())
         }, 700)
      })
   },
   onSaveRevision: ({templateId, revision, saveAsNew, base}: TPayloads.TTemplateRevisionSaveToBackendPayload): Promise<BFFResolvedResponse<void>> => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            console.log(`Saving revision ${revision.revision} to template ${templateId}`)
            console.log(revision)
            console.log('---')
            resolve(mockedResolvedApiResponse())
         }, 1200)
      })
   },
   onDeleteRevision: ({templateId, revisionId}: TPayloads.TTemplateRevisionDeleteToBackendPayload): Promise<BFFResolvedResponse<void>> => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            console.log(`Delete revision ${revisionId} from template ${templateId}`)
            resolve(mockedResolvedApiResponse())
         }, 700)
      })
   },
   onPublishTemplate: ({templateId, version}: TPayloads.TTemplatePublishToBackendPayload): Promise<BFFResolvedResponse<TPayloads.TTemplatePublishFromBackendPayload>> => { // test only with version digits
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            console.log(`Template -${templateId}- is publishing: (#${version.revisionId})`)
            console.log(version.comment)
            resolve(mockedResolvedApiResponse({
               version: 2,
               published: new Date().toISOString()
            })) // change later
         }, 700)
      })
   }
}

const MockedApiBuilderAdapter = () => {
   return <KueBuilderApp
      returnUrl="http://localhost:3000"
      userProfile={mockedProfilePayload.getData()}
      bffRequests={bffMockedRequests}
   />
}

export default MockedApiBuilderAdapter
