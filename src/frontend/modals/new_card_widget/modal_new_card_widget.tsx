import React from 'react'
import {ModalNewCardWidgetEvents, ModalNewCardWidgetProps} from '@intf/Modal'
import {RootState} from '@intf/State'

import {getWidgetProps, isWidgetActive} from '@state/selectors'
import {Widgets} from '@root/properties'
import {getSlotAsWord} from '@helpers/utils'
import ModalWrapper from '../_modal/modal'
import ModalNewCardWidgetForm from './modal_new_card_widget_form'

type Props = {
   state: RootState
   events: ModalNewCardWidgetEvents
}

const ModalNewCardWidget = ({state, events}: Props) => {
   const active = isWidgetActive(state, Widgets.NewCardWidgetModal)
   const widgetProps = getWidgetProps(state, Widgets.NewCardWidgetModal) as ModalNewCardWidgetProps

   if (active && widgetProps) {
      const slot = widgetProps.slot

      return (
         <ModalWrapper
            name="new-card-widget"
            caption="New card widget"
            onClose={events.onCloseContext}
            busy={false}
         >
            <section>
               <span className="--text">Select the widget you wish to add to the {getSlotAsWord(slot)} slot</span>
               <ModalNewCardWidgetForm
                  slot={slot}
                  onAddCardWidgetButtonClick={events.onAddCardWidgetButtonClick}
               />
            </section>
         </ModalWrapper>
      )
   }
   return <></>

}

export default ModalNewCardWidget
