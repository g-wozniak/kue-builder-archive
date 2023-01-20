import {useMemo, useState} from 'react'
import * as React from 'react'
import {DropdownItemProps} from 'semantic-ui-react'
import {CardWidget, common_CardWidgets, Utils} from '@kue-space/common'
import {faPlus} from '@fortawesome/pro-light-svg-icons/faPlus'

import UI from '@frontend/ui/ui'
import config from '@root/config'


type Props = {
   slot: number
   onAddCardWidgetButtonClick(slot: number, widget: CardWidget<any>): void
}

const ModalNewCardWidgetForm = ({slot, onAddCardWidgetButtonClick}: Props) => {

   const [widget, setWidget] = useState<common_CardWidgets | ''>('')

   const options: DropdownItemProps[] = useMemo(() => Object.keys(config.cards.widgets).map(widget => {
      const widgetConfig = config.cards.widgets[widget]
      return {
         key: `widget_add_${widget}`,
         value: widget,
         query: widget,
         text: (
            <UI.Input.RichDropdownOption
               label={widgetConfig.name}
               description={widgetConfig.role}
               icon={widgetConfig.icon}
            />
         )
      }
   }), [])

   return (
      <div className="--widgets-add-dropdown">
         <UI.Form name="widget-adding-form" buttons={
            <UI.Button.Classic
               id="modal-button--widget-add"
               caption="Confirm"
               disabled={widget.length === 0}
               onClick={() => onAddCardWidgetButtonClick(slot, {
                  id: Utils.uid(8),
                  slot,
                  widget: widget as any,
                  props: config.cards.widgets[widget].defaultProps
               })
               }
               icon={faPlus}/>}>
            <UI.Input.RichDropdown
               name="widget-add"
               disabled={false}
               onChange={(name, value) => setWidget(value ? (value as any).toString() : '')}
               placeholder="Select a card widget"
               value={widget}
               options={options}/>
         </UI.Form>
      </div>
   )
}

export default ModalNewCardWidgetForm
