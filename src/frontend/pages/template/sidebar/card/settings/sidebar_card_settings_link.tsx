import * as React from 'react'
import {useState} from 'react'
import {Edge, Node} from 'react-flow-renderer'
import {BlockDataProps} from '@kue-space/common'
import config from '@root/config'

import UI from '@frontend/ui/ui'
import SidebarCardSettingWrapper from './_setting/sidebar_card_setting'
import DropdownCardSelector from '@frontend/common/dropdowns/dropdown_card_selector'

type Props = {
   selectedBlock: Node
   nodes: Node[]
   edges: Edge[]
   onClick(selectedBlock: Node, sourceBlockId: string, existingEdgeIndex: number): void
}

export const getSourceBlock = (edges: Edge[], targetBlockId: string): string | '' => {
   const edge = edges.find(e => e.target === targetBlockId)
   return edge ? edge.source : ''
}

const getLinkIndex = (edges: Edge[], sourceBlockId: string, targetBlockId: string): number => {
   const edgeId = `${sourceBlockId}-${targetBlockId}`
   return edges.findIndex(e => e.id === edgeId && e.source === sourceBlockId && e.target === targetBlockId)
}

const getAvailableParentNodes = (nodes: Node<BlockDataProps>[], selectedBlock: Node): Node[] => {
   return nodes.filter(node => {
      const allowedChildren = config.blocks[node.type!].parentFor as string[]
      return node.id !== selectedBlock.id && allowedChildren.includes(selectedBlock.type!)
   })
}


const SidebarCardSettingsLink = ({edges, nodes, selectedBlock, onClick}: Props): JSX.Element => {

   const previousSourceBlockId = getSourceBlock(edges, selectedBlock.id)

   const [sourceBlockId, setSourceBlockId] = useState<string>(previousSourceBlockId)

   const existingLinkIndex = getLinkIndex(edges, previousSourceBlockId, selectedBlock.id)

   return (
      <SidebarCardSettingWrapper label="Source card" decoratorClass="change-link">
         <DropdownCardSelector
            name="link-search"
            placeholder="Select a source card"
            nodes={getAvailableParentNodes(nodes, selectedBlock)}
            value={sourceBlockId || previousSourceBlockId}
            hideDescription={true}
            onChange={(name, value) => setSourceBlockId(value ? value.toString() : '')}/>
         <UI.Button.Classic
            id="kue-builder-template-settings-button--change-link"
            disabled={!sourceBlockId || sourceBlockId === previousSourceBlockId}
            onClick={() => {
               onClick(selectedBlock, sourceBlockId, existingLinkIndex)
               setSourceBlockId('')
            }}
            caption="Update the link"
         />
      </SidebarCardSettingWrapper>
   )
}

export default SidebarCardSettingsLink
