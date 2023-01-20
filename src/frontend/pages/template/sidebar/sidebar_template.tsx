import * as React from 'react'
import {SidebarTemplateBaseProps} from '@intf/Sidebar'
import SidebarTemplateCard from './card/sidebar_card'
import SidebarTemplateSearch from './search/sidebar_search'


type Props = SidebarTemplateBaseProps

const SidebarTemplate = (props: Props): JSX.Element => {
   return (
      <>
         <SidebarTemplateSearch
            nodes={props.nodes}
            selectedBlockNode={props.selectedBlockNode}
            onCardSearchDropdownChange={props.events.onCardSearchDropdownChange}
         />
         <SidebarTemplateCard {...props}/>
      </>
   )
}

export default SidebarTemplate
