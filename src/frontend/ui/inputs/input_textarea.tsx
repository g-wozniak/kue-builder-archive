import * as React from 'react'
import {TextArea as SemanticTextArea} from 'semantic-ui-react'
import {InputHeight, onFormInputChange} from '@intf/Common'

type Props = {
   name: string
   value: string | number | undefined
   error?: boolean
   height?: InputHeight
   placeholder?: string
   onChange: onFormInputChange
}

const __InputTextarea = ({name, error, value, height, placeholder, onChange}: Props): JSX.Element => {
   return (
      <SemanticTextArea
         name={name}
         value={value || ''}
         placeholder={placeholder}
         className={`--kue-b-textarea ${height ? `--${height}` : ''} ${!!error ? '--error' : ''}`}
         id={`builder-input-${name}`}
         onChange={(e, d) => onChange(d.name, d.value)}
      />
   )
}

export default __InputTextarea
