import {Edge, EdgeChange, Node, NodeChange} from 'react-flow-renderer/nocss'
import React from 'react'

type OnChange<ChangesType> = (changes: ChangesType[]) => void

export type AppReactFlowProps = {
   setNodes: React.Dispatch<React.SetStateAction<Node[]>>
   setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
   nodes: Node[]
   edges: Edge[]
   onNodesChange: OnChange<NodeChange>
   onEdgesChange: OnChange<EdgeChange>
}