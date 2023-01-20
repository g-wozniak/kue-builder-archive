import * as React from 'react'
import {Dropdown, DropdownItemProps} from 'semantic-ui-react'
import {FormInputValues, onFormInputChange} from '@intf/Common'

type Props = {
   name: string
   value: string | number | undefined
   placeholder: string
   options: DropdownItemProps[] | undefined
   onChange: onFormInputChange
   disabled?: boolean
   noSearch?: boolean
}

const __InputRichDropdown = ({name, value, placeholder, options, disabled, noSearch, onChange}: Props): JSX.Element => {
   return (
      <Dropdown
         name={name}
         id={`builder-input-${name}`}
         className="--kue-b-rich-dropdown"
         onChange={(e, d) => onChange(d.name, (d.value as FormInputValues))}
         disabled={disabled}
         placeholder={placeholder}
         fluid
         {...(!noSearch && {search: true})}
         selection
         value={value}
         options={options || []}
      />
   )
}

export default __InputRichDropdown
