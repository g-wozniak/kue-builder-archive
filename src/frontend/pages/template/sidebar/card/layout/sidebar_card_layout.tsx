import * as React from 'react'
import {useMemo} from 'react'
import {SidebarTemplateProps} from '@intf/Sidebar'

import SidebarTemplateCardTabWrapper from '../_tabs/tab'
import SidebarTemplateCardLayoutSelect from './sidebar_card_layout_select'
import CardLayout from '@frontend/common/card/layouts/card_layout'

type Props = SidebarTemplateProps

const SidebarTemplateCardLayout = (props: Props) => {

   const widgets = useMemo(() => props.selectedBlockNode.data.widgets, [props.selectedBlockNode.data.widgets])

   const layout = useMemo(() => props.selectedBlockNode.data.layout, [props.selectedBlockNode.data.layout])

   return (
      <SidebarTemplateCardTabWrapper name="layout">
         <SidebarTemplateCardLayoutSelect
            layout={layout}
            onCardLayoutDropdownChange={props.events.onCardLayoutDropdownChange}
         />
         <CardLayout
            events={props.events}
            layout={layout}
            widgets={widgets}
            state={props.state}
         />
      </SidebarTemplateCardTabWrapper>
   )
}

export default SidebarTemplateCardLayout
