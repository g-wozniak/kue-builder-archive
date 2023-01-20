import {Dispatch, SetStateAction, useEffect} from 'react'
import {Edge, Node} from 'react-flow-renderer'
import {RootState} from '@intf/State'

import {getActiveRevisionStorageItem} from '@state/selectors'

type Args = {
   state: RootState
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
}

function onMountBuilder({state, setNodes, setEdges}: Args) {
   useEffect(() => {
      // Draw diagram if the template is already selected
      const currentRevision = getActiveRevisionStorageItem(state)
      if (currentRevision) {
         setNodes(currentRevision.nodes)
         setEdges(currentRevision.edges)
      }
   }, [])
}

export default onMountBuilder
