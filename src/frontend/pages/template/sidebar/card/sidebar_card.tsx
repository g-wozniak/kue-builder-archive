import * as React from 'react'
import {useEffect, useMemo, useState} from 'react'
import {common_Difficulties} from '@kue-space/common'
import {cloneDeep} from 'lodash'
import {faCreditCardFront} from '@fortawesome/pro-light-svg-icons/faCreditCardFront'
import {faSquarePlus} from '@fortawesome/pro-light-svg-icons/faSquarePlus'
import {AmendableBlockDataProps} from '@intf/Common'
import {SidebarTemplateBaseProps} from '@intf/Sidebar'

import {isWidgetActive} from '@state/selectors'
import {Widgets} from '@root/properties'
import SidebarTemplateCardTabsWrapper from './_tabs/tabs'
import SidebarTemplateCardDetails from './details/sidebar_card_details'
import SidebarTemplateCardLayout from './layout/sidebar_card_layout'
import SidebarTemplateCardSettings from './settings/sidebar_card_settings'
import SidebarTemplateCardNotSelected from './card_not_selected'
import UI from '@frontend/ui/ui'

/*
   Note: state for card details and widgets is placed here to avoid reset during switching tabs which is annoying from UX side.
 */

type Props = SidebarTemplateBaseProps

const SidebarTemplateCard = (props: Props) => {
   const type = props.selectedBlockNode?.type
   const blockData = props.selectedBlockNode?.data

   const initialCardDetails = useMemo(() => {
      const data: AmendableBlockDataProps = {
         label: blockData?.label || '',
         description: blockData?.description || '',
         customCardType: blockData?.customCardType || '',
         time: blockData?.time || 0,
         difficulty: blockData?.difficulty || common_Difficulties.None,
         cost: blockData?.cost || 0
      }
      return data
   }, [blockData])

   // Derivative object from the initial card details
   const [details, setCardDetails] = useState(cloneDeep(initialCardDetails))

   // Reset the initial state if another card gets selected
   useEffect(() => setCardDetails(initialCardDetails), [initialCardDetails])

   return (
      <UI.Window
         caption="Card details"
         icon={faCreditCardFront}
         buttons={
            <UI.Window.ButtonWrapper>
               <UI.Button.Icon
                  id="builder-sidebar-button--add-card"
                  disabled={!props.selectedBlockNode}
                  onClick={props.events.onAddBlockButtonClick}
                  active={isWidgetActive(props.state, Widgets.NewCardModal)}
                  icon={faSquarePlus}/>
            </UI.Window.ButtonWrapper>
         }
      >
         <section id="builder-sidebar-card" className="--kue-bs-template-block">
            {
               props.selectedBlockNode
                  ? <SidebarTemplateCardTabsWrapper tabs={[
                     {
                        menuItem: 'Card',
                        render: () => (
                           <SidebarTemplateCardDetails
                              initialState={initialCardDetails}
                              details={details}
                              events={props.events}
                              type={type!}
                              setCardDetails={setCardDetails}
                           />
                        )
                     },
                     {
                        menuItem: 'Layout',
                        render: () => <SidebarTemplateCardLayout {...props} selectedBlockNode={props.selectedBlockNode!}/>
                     },
                     {
                        menuItem: 'Settings',
                        render: () => <SidebarTemplateCardSettings {...props} selectedBlockNode={props.selectedBlockNode!}/>
                     }
                  ]}/>
                  : <SidebarTemplateCardNotSelected/>
            }
         </section>
      </UI.Window>
   )
}

export default SidebarTemplateCard
