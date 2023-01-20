import React from 'react'
import {common_CardWidgets} from '@kue-space/common'
import {faGear} from '@fortawesome/pro-light-svg-icons/faGear'
import {RootState} from '@intf/State'
import {ModalViewCardWidgetEvents, ModalViewCardWidgetProps} from '@intf/Modal'

import {Widgets} from '@root/properties'
import {getWidgetProps, isWidgetActive} from '@state/selectors'

import Card from '@frontend/common/card/card'
import ModalWrapper from '../_modal/modal'

type Props = {
   state: RootState
   events: ModalViewCardWidgetEvents
}

const ModalViewCardWidget = ({state, events}: Props) => {
   const active = isWidgetActive(state, Widgets.ViewCardWidgetModal)
   const props = getWidgetProps(state, Widgets.ViewCardWidgetModal) as ModalViewCardWidgetProps

   // const active = true
   // const widget = new TreeRevisionDummyModel().getNodes()[0].widgets[0]

   if (active && props && props.widget) {

      let component

      switch (props.widget.widget) {
         case common_CardWidgets.Text: {
            component = (
               <Card.Widget.Text
                  widget={props.widget}
                  events={events}
               />
            )
            break
         }
         default:
            component = <div />
      }

      return (
         <ModalWrapper
            name="view-card-widget"
            icon={faGear}
            caption="Edit widget"
            onClose={events.onCloseContext}
            busy={false}
         >
            <Card.Widget.Wrapper
               id={props.widget.id}
               widget={props.widget}>{component}</Card.Widget.Wrapper>
         </ModalWrapper>
      )
   }

   return <></>

}



export default ModalViewCardWidget
