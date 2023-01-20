import {Dispatch, SetStateAction, useEffect} from 'react'
import {Node, Edge} from 'react-flow-renderer'
import {TemplateRevisionDeleteToBackendPayload} from '@kue-space/common'
import {Dispatcher, RootState} from '@intf/State'
import {OnDeleteRevisionAsyncProcess, TemplateRevisionDeleteRequest} from '@intf/Requests'

import {AsyncProcesses} from '@root/properties'
import {deselectBlockIfSelected} from '@state/combined'
import {getActiveRevisionStorageItem, getAsyncProcess} from '@state/selectors'
import {deselectTemplate, removeRevision, setAsyncProcess} from '@state/actions'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'

type Args = {
   state: RootState
   dispatcher: Dispatcher
   request: TemplateRevisionDeleteRequest
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
}

const processName = AsyncProcesses.DeleteRevision

// useEffect: when saving new revision is triggered
function onDeleteRevisionHook({state, dispatcher, request, setEdges, setNodes}: Args) {

   useEffect(() => {
      const proc: OnDeleteRevisionAsyncProcess = getAsyncProcess(state, processName)
      const {templateId, revision} = proc.payload
      if (isAsyncProcessTriggered(proc) && revision && templateId) {

         request(new TemplateRevisionDeleteToBackendPayload({templateId, revisionId: revision}).getPayload())
            .then(response => {
               const activeRevision = getActiveRevisionStorageItem(state)
               if (activeRevision && activeRevision.revision === revision) {
                  deselectBlockIfSelected(state, dispatcher)
                  dispatcher(deselectTemplate())
                  setNodes([])
                  setEdges([])
               }
               dispatcher(removeRevision(templateId, revision))
               dispatcher(setAsyncProcess(processName, 'completed'))
            })
            .catch(() => {
               dispatcher(setAsyncProcess(processName, 'failed'))
            })
      } else if (isAsyncProcessResolved(proc)) {
         dispatcher(setAsyncProcess(processName, 'idle'))
      }
   }, [getAsyncProcess(state, processName)])
}

export default onDeleteRevisionHook
