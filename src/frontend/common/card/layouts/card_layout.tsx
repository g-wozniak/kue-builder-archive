import * as React from 'react'
import {ReactNode} from 'react'
import {common_CardLayouts} from '@kue-space/common'
import {CardLayoutProps} from '@intf/CardLayout'

import CardLayoutWidgetSlot from './card_layout_slot'
import CardLayoutSingle from './single/card_layout_single'
import CardLayoutTwoColumns from './two_columns/card_layout_two_columns'
import CardLayoutTwoRows from './two_rows/card_layout_two_rows'
import {getWidgetProps, isWidgetActive} from '@state/selectors'
import {Widgets} from '@root/properties'
import {ModalViewCardWidgetProps} from '@intf/Modal'

const CardLayout = ({layout, widgets, state, events}: CardLayoutProps) => {
   const slots: ReactNode[] = []
   for (let i = 0; i < 3; i++) {
      const openedWidgetModalProps = getWidgetProps(state, Widgets.ViewCardWidgetModal) as ModalViewCardWidgetProps
      const disabled = isWidgetActive(state, Widgets.NewCardWidgetModal) || (isWidgetActive(state, Widgets.ViewCardWidgetModal) && openedWidgetModalProps.widget.slot !== i + 1)
      slots.push(
         <CardLayoutWidgetSlot
            key={`card_layout_slot_${i}`}
            disabled={disabled}
            onCardLayoutEmptySlotButtonClick={events.onCardLayoutEmptySlotButtonClick}
            onCardLayoutSlotButtonClick={events.onCardLayoutSlotButtonClick}
            widget={widgets.find(w => w && w.slot === i + 1)} slot={i + 1}
         />
      )
   }

   switch (layout) {
      case common_CardLayouts.Single: {
         return <CardLayoutSingle slots={slots}/>
      }
      case common_CardLayouts.TwoColumns: {
         return <CardLayoutTwoColumns slots={slots}/>
      }
      case common_CardLayouts.TwoEqualColumns: {
         return <CardLayoutTwoColumns equal={true} slots={slots}/>
      }
      case common_CardLayouts.TwoRows: {
         return <CardLayoutTwoRows slots={slots}/>
      }
   }
   return null
}


export default CardLayout