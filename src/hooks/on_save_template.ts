import {useEffect} from 'react'
import {TemplateSaveToBackendPayload} from '@kue-space/common'
import {Dispatcher, RootState} from '@intf/State'
import {OnSaveTemplateAsyncProcess, TemplateSaveRequest} from '@intf/Requests'

import {getAsyncProcess} from '@state/selectors'
import {setActiveTemplateAsLocal, setAsyncProcess, updateTemplate} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'

type Args = {
   state: RootState
   request: TemplateSaveRequest
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.SaveTemplate

function onSaveTemplateHook({state, dispatcher, request}: Args) {
   const templateId = state.activeTemplate?.templateId
   useEffect(() => {
      const proc: OnSaveTemplateAsyncProcess = getAsyncProcess(state, processName)
      if (templateId && isAsyncProcessTriggered(proc)) {
         const payload = new TemplateSaveToBackendPayload({templateId, amendedTemplate: proc.payload})
         const validation = payload.validate()
         if (validation.length === 0) {
            request(payload.getPayload())
               .then(response => {
                  dispatcher(updateTemplate(templateId, proc.payload))
                  dispatcher(setActiveTemplateAsLocal(false))
                  dispatcher(setAsyncProcess(processName, 'completed'))
               })
               .catch(() => {
                  dispatcher(setAsyncProcess(processName, 'failed'))
               })
         } else {
            console.error(validation)
            dispatcher(setAsyncProcess(processName, 'failed', validation))
         }
      } else if (isAsyncProcessResolved(proc)) {
         dispatcher(setAsyncProcess(processName, 'idle'))
      }
   }, [getAsyncProcess(state, processName)])
}

export default onSaveTemplateHook
