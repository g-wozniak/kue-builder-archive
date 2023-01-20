import {useEffect} from 'react'
import {
   TemplatePublishFromBackendPayload,
   TemplatePublishToBackendPayload, TPayloads
} from '@kue-space/common'
import isEmpty from 'lodash/isEmpty'
import {Dispatcher, RootState} from '@intf/State'
import {OnPublishTemplateAsyncProcess, TemplatePublishRequest} from '@intf/Requests'

import {getAsyncProcess} from '@state/selectors'
import {
   setActiveTemplateRevisions,
   setAsyncProcess,
   toggleTemplatePublishModal,
   updateRevision, updateRevisionDescription,
   updateTemplate
} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'


type Args = {
   state: RootState
   request: TemplatePublishRequest
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.PublishTemplate

function onPublishTemplateHook({state, dispatcher, request}: Args) {
   useEffect(() => {
      const proc: OnPublishTemplateAsyncProcess = getAsyncProcess(state, processName)
      const {templateId, revision, comment} = proc.payload

      if (isAsyncProcessTriggered(proc)) {
         request(new TemplatePublishToBackendPayload({
            templateId,
            version: {
               revisionId: revision,
               comment
            }
         }).getPayload())
            .then(response => {
               if (response.data && !isEmpty(response.data)) {
                  const fromBackendPayload = new TemplatePublishFromBackendPayload(response.data.data as TPayloads.TTemplatePublishFromBackendPayload)
                  const data = fromBackendPayload.getData()
                  if (data) {
                     dispatcher(updateTemplate(templateId, {
                        version: {
                           major: data.version,
                           comment,
                           revision,
                           published: data.published
                        }
                     }))
                     dispatcher(setActiveTemplateRevisions({published: revision}))
                     dispatcher(toggleTemplatePublishModal(false))
                     dispatcher(setAsyncProcess(processName, 'completed'))
                  }
               } else {
                  // TODO: error message?
                  dispatcher(setAsyncProcess(processName, 'failed')) // `why` param?
               }
            })
            .catch(() => {
               dispatcher(setAsyncProcess(processName, 'failed'))
            })

      } else if (isAsyncProcessResolved(proc)) {
         dispatcher(setAsyncProcess(processName, 'idle'))
      }
   }, [getAsyncProcess(state, processName)])
}

export default onPublishTemplateHook
