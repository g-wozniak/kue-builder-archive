import {useMemo} from 'react'
import * as React from 'react'
import sortBy from 'lodash/sortBy'
import {DropdownItemProps} from 'semantic-ui-react'
import {Node} from 'react-flow-renderer'
import config from '@root/config'

import UI from '@frontend/ui/ui'

import {onFormInputChange} from '@intf/Common'

type Props = {
   name: string
   placeholder: string
   nodes: Node[]
   value: string
   onChange: onFormInputChange
   hideDescription?: boolean
}

const DropdownCardSelector = ({name, placeholder, nodes, value, onChange, hideDescription}: Props): JSX.Element => {

   const options: DropdownItemProps[] = useMemo(() => sortBy(nodes, ['data.label']).map((node) => ({
      key: `${name}_card_selection_${node.id}`,
      value: node.id,
      query: `${node.data.label} ${node.data.description}`,
      text: (
         <UI.Input.RichDropdownOption
            label={node.data.label}
            image={config.blocks[node.type!].icon}
            extraClassName={`--${node.type?.toLowerCase()}`}
            {...(!hideDescription ? {description: node.data.description} : {})}
         />
      )
   })), [nodes])

   return (
      <UI.Input.RichDropdown
         name={name}
         placeholder={placeholder}
         onChange={onChange}
         noSearch={true} // lift it if we figure out why doesnt search
         options={options}
         value={value}
      />
   )
}

export default DropdownCardSelector
