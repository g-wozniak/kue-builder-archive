import * as React from 'react'
import {Input} from 'semantic-ui-react'
import {onFormInputChange} from '@intf/Common'

type Props = {
   name: string
   value: string | number | undefined
   error?: boolean
   placeholder?: string
   onChange: onFormInputChange
}

const __InputTextbox = ({name, value, error, placeholder, onChange}: Props): JSX.Element => {
   return (
      <Input
         id={`builder-input-${name}`}
         name={name}
         className="--kue-b-textbox"
         fluid={true}
         error={error}
         value={value}
         placeholder={placeholder}
         onChange={(e, d) => onChange(d.name, d.value)}
      />
   )
}
export default __InputTextbox
