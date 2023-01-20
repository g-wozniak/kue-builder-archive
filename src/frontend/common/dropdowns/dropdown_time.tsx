import {useEffect, useState} from 'react'
import * as React from 'react'
import {Utils} from '@kue-space/common'
import {FormInputValues, onFormInputChange} from '@intf/Common'

import {formDataSetter} from '@helpers/utils'
import {TimeToComplete} from '@root/properties'
import UI from '@frontend/ui/ui'

type Props = {
   name: string
   value: FormInputValues
   placeholder?: string
   onChange: onFormInputChange
}

const translation = {
   min_1: '1 minute',
   min_5: '5 minutes',
   min_15: '15 minutes',
   min_30: '30 minutes',
   h_1: '1 hour',
   h_2: '2 hours',
   d_1: 'full day',
   w_1: 'a week',
   m_1: 'a month',
   custom: 'type in...'
}

const conversions = {
   min_1: 1,
   min_5: 5,
   min_15: 15,
   min_30: 30,
   h_1: 60,
   h_2: 120,
   d_1: 7 * 60,
   w_1: 5 * 7 * 60,
   m_1: 20 * 7 * 60
}

const DropdownTimeToComplete = ({name, value, placeholder, onChange}: Props): JSX.Element => {

   const [time, setTime] = useState({defined: '', custom: ''})

   const [initialValue] = useState(value)

   useEffect(() => {
      if (time.defined !== TimeToComplete.Custom && time.defined !== '') {
         onChange('time', conversions[time.defined])
      }
   }, [time.defined])

   useEffect(() => {
      if (time.custom !== '') {
         onChange('time', Number(time.custom))
      }
   }, [time.custom])

   useEffect(() => {
      if (value === initialValue) {
         setTime(formDataSetter('defined', ''))
         setTime(formDataSetter('custom', ''))
      }
   }, [value])

   return (
      <div className="--kue-b-dropdown-time" id="builder-input-time-dropdown">
         <div className="--dropdown">
            <UI.Input.Dropdown
               name={name}
               placeholder={placeholder}
               onChange={(name: string, value: FormInputValues) => setTime(formDataSetter('defined', value))}
               disabled={time.defined === TimeToComplete.Custom}
               options={Utils.enumToSemanticUIOptions('time-predefined', TimeToComplete, translation)}
               noSearch={true}
               value={time.defined}
            />
         </div>
         {time.defined === TimeToComplete.Custom && (
            <div className="--textbox">
               <UI.Input.RichTextbox
                  name={`${name}-custom`}
                  placeholder="Type your estimation"
                  icon="time"
                  required={false}
                  value={time.custom}
                  onChange={(name: string, value: FormInputValues) => setTime(formDataSetter('custom', value))}
                  label="minutes"
               />
            </div>
         )}
      </div>
   )
}

export default DropdownTimeToComplete
