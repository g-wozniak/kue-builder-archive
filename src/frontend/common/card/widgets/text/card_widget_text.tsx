import {useMemo, useState} from 'react'
import * as React from 'react'
import {CardWidgetTextProps, CardWidget} from '@kue-space/common'
import isEqual from 'lodash/isEqual'
import {faPencil} from '@fortawesome/pro-light-svg-icons/faPencil'
import {faXmark} from '@fortawesome/pro-light-svg-icons/faXmark'
import {ModalViewCardWidgetEvents} from '@intf/Modal'

import UI from '@frontend/ui/ui'
import {formDataSetter} from '@helpers/utils'

type Props = {
   widget: CardWidget<CardWidgetTextProps>
   events: ModalViewCardWidgetEvents
}

const CardWidgetText = ({widget, events}: Props): JSX.Element => {

   const initialValues = useMemo(() => widget.props, [widget.props])

   const [values, setValues] = useState(initialValues)

   const hasFormChanged = useMemo(() => !isEqual(initialValues, values), [initialValues, values])

   // TODO: Errors
   // const [errors, setErrors] = useState([])
   // const error = !!(errors && errors.fields.indexOf('text') !== -1)

   return (
      <UI.Form name="widget-form" buttons={[
         <UI.Button.Classic
            key={`${widget.id}_modal_edit_delete_button`}
            id="modal-button--widget-delete"
            caption="Delete"
            disabled={false}
            role="critical"
            onClick={() => events.onDeleteCardWidgetButtonClick(widget.id)}
            icon={faXmark}/>,
         <UI.Button.Classic
            key={`${widget.id}_modal_edit_update_button`}
            id="modal-button--widget-update"
            caption="Update"
            disabled={!hasFormChanged}
            onClick={() => events.onUpdateCardWidgetButtonClick(widget.id, values)}
            icon={faPencil}/>
      ]}>
         <UI.Input.Textbox
            name="caption"
            value={values.caption}
            onChange={(name, value) => setValues(formDataSetter(name, value))}
         />
         <UI.Input.Textarea
            name="text"
            value={values.text}
            error={false}
            onChange={(name, value) => setValues(formDataSetter(name, value))}
            height="large"/>
      </UI.Form>
   )
}

export default CardWidgetText
