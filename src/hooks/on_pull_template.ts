import isEmpty from 'lodash/isEmpty'
import {Dispatch, SetStateAction, useEffect} from 'react'
import {TemplateModel, TemplateToBackendPayload, TPayloads} from '@kue-space/common'
import {Edge, Node} from 'react-flow-renderer'
import {Dispatcher, RootState} from '@intf/State'
import {OnPullTemplateAsyncProcess, TemplateRequest} from '@intf/Requests'

import {AsyncProcesses} from '@root/properties'
import {getAsyncProcess} from '@state/selectors'
import {
   updateActiveTemplate, setActiveTemplateAsLocal,
   setActiveTemplateRevisions, setAsyncProcess, updateTemplate
} from '@state/actions'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'
import {templateToRevisionStorage} from '@helpers/convert'

type Args = {
   state: RootState
   request: TemplateRequest
   dispatcher: Dispatcher
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
}

const processName = AsyncProcesses.PullTemplate

function onPullTemplateHook({state, dispatcher, request, setNodes, setEdges}: Args) {

   useEffect(() => {
      const proc: OnPullTemplateAsyncProcess = getAsyncProcess(state, processName)
      const selectedTemplate = state.selectedTemplate
      if (isAsyncProcessTriggered(proc)) {

         // Fail it if template for some reason is not selected earlier
         if (!selectedTemplate.id || !selectedTemplate.revision) {
            // TODO: error message in payload?
            dispatcher(setAsyncProcess(processName, 'failed'))
         }

         request(new TemplateToBackendPayload({templateId: selectedTemplate.id!}).getPayload())
            .then(response => {
               if (response.data && !isEmpty(response.data)) {
                  const template = new TemplateModel(response.data.data as TPayloads.TTemplateFromBackendPayload)

                  // Convert revisions from the DB to front-end readable
                  const [storage, index] = templateToRevisionStorage(template, selectedTemplate.revision!)
                  dispatcher(updateTemplate(template.getId(), {
                     name: template.getName(),
                     headline: template.getHeadline(),
                     description: template.getDescription(),
                     slug: template.getSlug(),
                     version: template.getVersion(),
                     revisions: template.getTree().map((treeRev) => {
                        const rev: TPayloads.TUserProfileTreeRevisionFragment = {
                           revision: treeRev.revision,
                           label: treeRev.label,
                           comment: treeRev.comment,
                           timestamp: treeRev.timestamp,
                           nodes: treeRev.nodes.length
                        }
                        return rev
                     }),
                     created: template.getCreated()
                  }))

                  // Set up the revision information
                  dispatcher(setActiveTemplateRevisions({
                     current: selectedTemplate.revision,
                     published: template.getVersion().revision,
                     base: selectedTemplate.revision
                  }))

                  // Set active template
                  dispatcher(updateActiveTemplate(template.getId(), storage))
                  dispatcher(setActiveTemplateAsLocal(false))

                  // Set nodes and edges as the active revision is
                  setNodes(storage[index].nodes)
                  setEdges(storage[index].edges)

                  // Complete the process
                  dispatcher(setAsyncProcess(processName, 'completed'))
               } else {
                  dispatcher(setAsyncProcess(processName, 'failed'))
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

export default onPullTemplateHook