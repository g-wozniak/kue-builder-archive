import * as React from 'react'
import {Button} from 'semantic-ui-react'
import {KeyAny} from '@kue-space/common'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


type Props = {
   id: string
   icon: IconDefinition
   disabled: boolean
   onClick: any
   loading?: boolean
   caption?: string
   active?: boolean
   style?: KeyAny
}

const __ButtonIcon = ({id, icon, active, loading, style, caption, disabled, onClick}: Props): JSX.Element => {

   return (
      <Button
         id={id}
         className="--kue-b-button-icon"
         disabled={disabled}
         onClick={onClick}
         active={active}
         loading={loading}
         style={style}>
            <FontAwesomeIcon icon={icon}/>
            {caption ? <span className="--caption">{caption}</span> : ''}
      </Button>
   )
}

export default __ButtonIcon
