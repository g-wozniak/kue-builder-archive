import * as React from 'react'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CardIcon from '@frontend/common/card/card_icon'

type Props = {
   label: string
   description?: string
   image?: string
   icon?: IconDefinition
   extraClassName?: string
}

type PropsWithIcon = Props & {
   icon: IconDefinition
   image?: never
}

type PropsWithImage = Props & {
   image: string
   icon?: never
}

const __InputRichDropdownOption = ({label, description, image, icon, extraClassName}: PropsWithIcon | PropsWithImage): JSX.Element => {
   return (
      <div className={`--kue-b-rich-dropdown-item ${extraClassName || ''}`}>
         <div className="--icon">
            {image && <CardIcon icon={image} height={24} alt={label}/>}
            {icon && <FontAwesomeIcon icon={icon}/>}
         </div>
         <div className="--block">
            <span className="--block-label">{label}</span>
            {description && <span className="--block-description">{description}</span>}
         </div>
      </div>
   )
}

export default __InputRichDropdownOption
