import * as React from 'react'
import {useEffect, useState} from 'react'
import {
   AnyBFFRoute,
   BFFResolvedResponse,
   common_Headers,
   common_RequestMethods,
   FromBackendPayload,
   KeyAny,
   Routes,
   TemplateFromBackendPayload,
   TemplatePublishFromBackendPayload,
   TemplatePublishToBackendPayload,
   TemplateRevisionDeleteToBackendPayload,
   TemplateRevisionSaveToBackendPayload,
   TemplateSaveToBackendPayload,
   TPayloads,
   UserProfileFromBackendPayload,
   UserSignInToBackendPayload
} from '@kue-space/common'
import axios, {AxiosRequestConfig} from 'axios'
import KueBuilderApp from '@root/app'

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

const makeBFFRequest = async (route: AnyBFFRoute, payload: KeyAny = {}, token: string | null): Promise<KeyAny> => {
   const simulatorUrl = 'http://localhost:3001'
   const url = `${simulatorUrl}${route.getUri()}`
   const options: AxiosRequestConfig = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   if (token) {
      options.headers![common_Headers.Authorization] = token
   }
   switch (route.getMethod()) {
      case common_RequestMethods.GET: {
         return axios.get(url, {...options, params: payload})
      }
      case common_RequestMethods.DELETE: {
         return axios.delete(url, {...options, params: payload})
      }
      default:
         return axios[route.getMethod()](url, payload, options)
   }
}

const bffRequests = (token: string | null) => ({
   onPullTemplate: ({templateId}: TPayloads.TTemplateToBackendPayload): Promise<BFFResolvedResponse<TPayloads.TTemplateFromBackendPayload>> => {
      return new Promise((resolve, reject) => {
         console.log(`Obtaining template details for ${templateId}`)
         const route = new Routes.Template()
         makeBFFRequest(route, {templateId}, token)
            .then((response) => {
               const data = new TemplateFromBackendPayload(response.data.data as TPayloads.TTemplateFromBackendPayload).getData()
               resolve(mockedResolvedApiResponse(data))
            })
            .catch((e) => reject(e))
      })
   },
   onSaveTemplate: ({templateId, amendedTemplate}: TPayloads.TTemplateSaveToBackendPayload): Promise<BFFResolvedResponse<void>> => {
      return new Promise((resolve, reject) => {
         const route = new Routes.TemplateSave()
         makeBFFRequest(route, new TemplateSaveToBackendPayload({templateId, amendedTemplate}).getPayload(), token)
            .then(() => {
               resolve(mockedResolvedApiResponse())
            })
            .catch((e) => reject(e))
      })
   },
   onSaveRevision: ({templateId, revision, base, saveAsNew}: TPayloads.TTemplateRevisionSaveToBackendPayload): Promise<BFFResolvedResponse<void>> => {
      return new Promise((resolve, reject) => {
         console.log(`Saving revision ${revision.revision} to template ${templateId}`)
         const route = new Routes.TemplateRevisionSave()
         makeBFFRequest(route, new TemplateRevisionSaveToBackendPayload({templateId, revision, base, saveAsNew}).getPayload(), token)
            .then(() => {
               resolve(mockedResolvedApiResponse())
            })
            .catch((e) => reject(e))
      })
   },
   onDeleteRevision: ({templateId, revisionId}: TPayloads.TTemplateRevisionDeleteToBackendPayload): Promise<BFFResolvedResponse<void>> => {
      return new Promise((resolve, reject) => {
         console.log(`Delete revision ${revisionId} from template ${templateId}`)
         const route = new Routes.TemplateRevisionDelete()
         makeBFFRequest(route, new TemplateRevisionDeleteToBackendPayload({templateId, revisionId}).getPayload(), token)
            .then(() => {
               resolve(mockedResolvedApiResponse())
            })
            .catch((e) => reject(e))
      })
   },
   onPublishTemplate: ({templateId, version}: TPayloads.TTemplatePublishToBackendPayload): Promise<BFFResolvedResponse<TPayloads.TTemplatePublishFromBackendPayload>> => { // test only with version digits
      return new Promise((resolve, reject) => {
         console.log(`Template -${templateId}- is publishing: (#${version.revisionId})`)
         const route = new Routes.TemplatePublish()
         makeBFFRequest(route, new TemplatePublishToBackendPayload({templateId, version}).getPayload(), token)
            .then((response) => {
               const data = new TemplatePublishFromBackendPayload(response.data.data as TPayloads.TTemplatePublishFromBackendPayload).getData()
               resolve(mockedResolvedApiResponse(data))
            })
            .catch((e) => reject(e))
      })
   }
})


const ApiBuilderAdapter = () => {
   const [userProfile, setUserProfile] = useState<any>(undefined)
   const [token, setToken] = useState('')

   useEffect(() => {
      makeBFFRequest(new Routes.UserSignIn(), new UserSignInToBackendPayload({username_alias: 'greg', password: 'Test1234!'}).getPayload(), null)
         .then(response => {
            setToken(response.headers[common_Headers.Authorization])
         })
         .catch(() => {
            console.error('Error whilst obtaining token')
         })
   }, [])

   useEffect(() => {
      if (token) {
         makeBFFRequest(new Routes.UserProfile(), {}, token)
            .then((response) => {
               const payload = new UserProfileFromBackendPayload(response.data.data as TPayloads.TUserProfileFromBackendPayload)
               console.log(payload.getData())
               setUserProfile(payload.getData())
            })
            .catch(() => {
               console.error('Error whilst obtaining user profile details')
            })
      }
   }, [token])

   return (
      userProfile ? (
         <KueBuilderApp
            returnUrl="http://localhost:3000"
            userProfile={userProfile}
            bffRequests={bffRequests(token)}
         />
      ) : <h1>Loading API...</h1>
   )
}

export default ApiBuilderAdapter
