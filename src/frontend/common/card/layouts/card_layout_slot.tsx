import {CardWidget} from '@kue-space/common'
import * as React from 'react'
import {faPlus} from '@fortawesome/pro-light-svg-icons/faPlus'

import config from '@root/config'
import UI from '@frontend/ui/ui'

type Props = {
   slot: number
   widget: CardWidget<any> | undefined
   disabled: boolean
   onCardLayoutEmptySlotButtonClick(slot: number): void
   onCardLayoutSlotButtonClick(widget: CardWidget<any>): void
}

const CardLayoutWidgetSlot = ({
   slot,
   widget,
   disabled,
   onCardLayoutEmptySlotButtonClick,
   onCardLayoutSlotButtonClick
}: Props) => {

   const editable = !!widget
   return (
      <div className={`--widget-slot --${editable ? 'preview' : 'empty'}`}>
         {
            widget
               ? <UI.Button.Icon
                     id={`edit-widget-${slot}`}
                     icon={config.cards.widgets[widget.widget].icon}
                     disabled={disabled}
                     caption={widget.props.caption}
                     onClick={() => onCardLayoutSlotButtonClick(widget)}/>
               : <UI.Button.Icon
                  id={`add-widget-to-slot-${slot}`}
                  icon={faPlus}
                  disabled={disabled}
                  onClick={() => onCardLayoutEmptySlotButtonClick(slot)}/>
         }
      </div>
   )
}


export default CardLayoutWidgetSlot
