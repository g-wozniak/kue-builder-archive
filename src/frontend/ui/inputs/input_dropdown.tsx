import * as React from 'react'
import {Dropdown, DropdownItemProps} from 'semantic-ui-react'
import {FormInputValues, onFormInputChange} from '@intf/Common'

type Props = {
   name: string
   value: string | number | undefined
   options: DropdownItemProps[] | undefined
   onChange: onFormInputChange
   placeholder?: string
   disabled?: boolean
   noSearch?: boolean
}

const __InputDropdown = ({name, value, placeholder, options, disabled, noSearch, onChange}: Props): JSX.Element => {
   return (
      <Dropdown
         name={name}
         id={`builder-input-${name}`}
         className="--kue-b-dropdown icon"
         onChange={(e, d) => onChange(d.name, (d.value as FormInputValues))}
         disabled={disabled}
         placeholder={placeholder}
         {...(!noSearch && {search: true})}
         fluid
         selection
         value={value}
         options={options || []}
      />
   )
}
export default __InputDropdown
