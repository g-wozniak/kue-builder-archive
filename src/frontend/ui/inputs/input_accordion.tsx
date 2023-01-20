import * as React from 'react'
import {Button, DropdownItemProps, Transition} from 'semantic-ui-react'
import {useMemo, useState} from 'react'
import isEqual from 'lodash/isEqual'
import {InputAccordionInputTypes, FormInputValues, InputHeight} from '@intf/Common'

import {formDataSetter} from '@helpers/utils'
import UI from '@frontend/ui/ui'
import DropdownTimeToComplete from '@frontend/common/dropdowns/dropdown_time'

type Props = {
   name: string
   label: string
   inputType: InputAccordionInputTypes
   value: FormInputValues
   setInputs: React.Dispatch<React.SetStateAction<any>>
   description?: string
   placeholder?: string
   height?: InputHeight
   options?: DropdownItemProps[]
   inputLabel?: string
   initialValue?: FormInputValues
}

const __InputAccordion = ({
                             name,
                             label,
                             description,
                             inputType,
                             inputLabel,
                             height,
                             initialValue,
                             placeholder,
                             options,
                             value,
                             setInputs
                          }: Props): JSX.Element => {
   const [display, setDisplay] = useState(true)
   const _initialValue = useMemo(() => initialValue || value, [initialValue])

   const hasInputChanged = useMemo(() => {
      return !isEqual(value, initialValue)
   }, [value, initialValue])


   function onInputChange(name: string, value: FormInputValues) {
      setInputs(formDataSetter(name, value))
   }

   const onInputReset = () => {
      setInputs(prev => ({
         ...prev,
         [name]: _initialValue
      }))
   }

   const accordionIcon = !display ? 'angle up' : 'angle down'
   return (
      <div className="--kue-b-input-accordion" id={`builder-input-${name}-set`}>
         <header className="--kue-b-input-accordion-header">
            <label
               htmlFor={`builder-input-${name}`}>{label}</label>
            <div className="--buttons">
               <Button
                  className="--undo"
                  icon="undo"
                  disabled={!hasInputChanged || !display}
                  onClick={onInputReset}/>
               <Button
                  disabled={false}
                  onClick={() => setDisplay(!display)}
                  className="--accordion"
                  icon={accordionIcon}/>
            </div>
         </header>
         <Transition
            animation="fade down"
            duration={200}
            visible={display}
         >
            <div className="--kue-b-input-accordion-body">
               {description && <span className="--description">{description}</span>}
               <div className="--input">
                  {inputType === 'textarea' &&
                      <UI.Input.Textarea
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          height={height}
                          onChange={onInputChange}/>}
                  {inputType === 'textbox' &&
                      <UI.Input.Textbox
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          onChange={onInputChange}/>}
                  {inputType === 'rich_textbox' &&
                      <UI.Input.RichTextbox
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          {...(inputLabel && {label: inputLabel})}
                          onChange={onInputChange}/>}
                  {inputType === 'dropdown_time' &&
                      <DropdownTimeToComplete
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          onChange={onInputChange}/>}
                  {inputType === 'dropdown' && options &&
                      <UI.Input.Dropdown
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          options={options}
                          noSearch={true}
                          onChange={onInputChange}/>}
               </div>
            </div>
         </Transition>
      </div>
   )
}

export default __InputAccordion
