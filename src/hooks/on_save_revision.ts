import cloneDeep from 'lodash/cloneDeep'
import {Dispatch, SetStateAction, useEffect} from 'react'
import {Node, Edge} from 'react-flow-renderer'
import {TemplateRevisionSaveToBackendPayload, Utils} from '@kue-space/common'
import {RootState, Dispatcher, CombinedTemplateItem} from '@intf/State'
import {OnSaveRevisionAsyncProcess, TemplateRevisionSaveRequest} from '@intf/Requests'

import {
   getAsyncProcess,
   getActiveRevisions,
   getActiveTemplateActiveRevision
} from '@state/selectors'
import {
   activateRevision,
   insertRevision,
   resetUnsavedStepsAndBlocks,
   setAsyncProcess, toggleTemplatesRevisionSaveAsNewForm,
   updateRevision
} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'
import {revisionToTreeRevision} from '@helpers/convert'

type Args = {
   state: RootState
   dispatcher: Dispatcher
   request: TemplateRevisionSaveRequest
   nodes: Node[]
   edges: Edge[]
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
}

const processName = AsyncProcesses.SaveRevision

function onSaveRevisionHook({state, dispatcher, request, nodes, edges, setEdges, setNodes}: Args) {

   useEffect(() => {
      const {base, current} = getActiveRevisions(state)
      const proc: OnSaveRevisionAsyncProcess = getAsyncProcess(state, processName)

      if (isAsyncProcessTriggered(proc) && current) {
         let item: CombinedTemplateItem
         const {label, comment, saveAsNew} = proc.payload
         const templateId = state.activeTemplate.templateId
         const timestamp = Utils.timestamp()
         const _nodes = cloneDeep(nodes)
         const _edges = cloneDeep(edges)

         if (!templateId || !base) {
            dispatcher(setAsyncProcess(processName, 'failed'))
         } else {
            if (saveAsNew && label) {
               item = {
                  revision: current,
                  label,
                  timestamp,
                  nodes: _nodes,
                  edges: _edges
               }
               if (comment) {
                  item.comment = comment
               }
            } else {
               const activeRevision = getActiveTemplateActiveRevision(state)!
               item = {
                  revision: base,
                  label: activeRevision.label,
                  comment: activeRevision.comment,
                  timestamp,
                  nodes: _nodes,
                  edges: _edges
               }
            }

            request(new TemplateRevisionSaveToBackendPayload({
               templateId,
               base,
               revision: revisionToTreeRevision(item),
               saveAsNew
            }).getPayload())
               .then(response => {
                  if (saveAsNew) {
                     dispatcher(insertRevision(item))
                     dispatcher(activateRevision(current))
                     dispatcher(toggleTemplatesRevisionSaveAsNewForm(false))
                  } else {
                     dispatcher(updateRevision(base, item))
                  }
                  setNodes(_nodes)
                  setEdges(_edges)
                  dispatcher(resetUnsavedStepsAndBlocks())
                  dispatcher(setAsyncProcess(processName, 'completed'))
               })
               .catch(() => {
                  dispatcher(setAsyncProcess(processName, 'failed'))
               })
         }
      } else if (isAsyncProcessResolved(proc)) {
         dispatcher(setAsyncProcess(processName, 'idle'))
      }
   }, [getAsyncProcess(state, processName)])
}

export default onSaveRevisionHook
