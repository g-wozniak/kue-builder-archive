import * as React from 'react'
import {Button} from 'semantic-ui-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {IconDefinition} from '@fortawesome/fontawesome-svg-core'

type Props = {
   id: string
   caption: string
   role?: 'critical' | 'cancel' | 'publish'
   small?: boolean
   active?: boolean
   loading?: boolean
   disabled: boolean
   icon?: IconDefinition
   onClick: any
}

const ButtonClassic = ({id, caption, active, small, role, loading, disabled, icon, onClick}: Props): JSX.Element => {

   const cssClass = [
      '--kue-b-button-classic',
      icon ? '--with-icon' : '',
      role ? `--${role}` : '',
      small ? '--small' : ''
   ]

   return (
      <Button
         className={cssClass.join(' ')}
         id={id}
         name={id}
         active={active}
         loading={loading}
         onClick={onClick}
         disabled={disabled}
      >
         {icon && <span className="--icon"><FontAwesomeIcon icon={icon}/></span>}
         <span className="--caption">{caption}</span>
      </Button>
   )
}

export default ButtonClassic
