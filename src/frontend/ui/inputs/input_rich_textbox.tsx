import * as React from 'react'
import {Input, SemanticICONS} from 'semantic-ui-react'
import {FormInputValues, onFormInputChange} from '@intf/Common'

type Props = {
   name: string
   value: FormInputValues
   onChange: onFormInputChange
   required?: boolean
   placeholder?: string
   label?: string
   icon?: SemanticICONS
}

const __InputRichTextbox = ({name, icon, placeholder, value, required, label, onChange}: Props): JSX.Element => {

   let extraProps = {}

   if (required) {
      extraProps = {label: {icon: 'asterisk'}, labelPosition: 'right corner'}
   }

   if (label) {
      // label overwrites required
      extraProps = {
         label: {basic: true, content: label},
         labelPosition: 'right'
      }
   }

   if (icon) {
      extraProps = {...extraProps, icon, iconPosition: 'left'}
   }

   return (
      <Input
         name={name}
         id={`builder-input-${name}`}
         icon="search"
         iconPosition="left"
         className="--kue-b-rich-textbox"
         value={value}
         placeholder={placeholder}
         fluid={true}
         onChange={(e, d) => onChange(d.name, d.value)}
         {...extraProps}
      />
   )
}

export default __InputRichTextbox
