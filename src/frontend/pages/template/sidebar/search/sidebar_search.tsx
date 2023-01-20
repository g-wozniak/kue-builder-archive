import * as React from 'react'
import {Node} from 'react-flow-renderer/nocss'
import {faMagnifyingGlass} from '@fortawesome/pro-light-svg-icons/faMagnifyingGlass'
import {onFormInputChange, SelectedBlock} from '@intf/Common'
import UI from '@frontend/ui/ui'
import DropdownCardSelector from '@frontend/common/dropdowns/dropdown_card_selector'

type Props = {
   nodes: Node[]
   selectedBlockNode: SelectedBlock | undefined
   onCardSearchDropdownChange: onFormInputChange
}

const SidebarTemplateSearch = ({nodes, selectedBlockNode, onCardSearchDropdownChange}: Props): JSX.Element => {
   return (
      <UI.Window
         caption="Find a card"
         icon={faMagnifyingGlass}>
         <section id="builder-sidebar-template-search" className="--kue-bs-template-tree">
            <DropdownCardSelector
               name="template-card-search"
               placeholder="Search for card"
               nodes={nodes}
               value={selectedBlockNode?.id || ''}
               onChange={onCardSearchDropdownChange}
            />
         </section>
      </UI.Window>
   )
}

export default SidebarTemplateSearch
