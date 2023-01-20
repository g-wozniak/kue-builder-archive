import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import TagWrapper from './_tag/tag'

type Props = {
   icons: IconDefinition[]
   text: string
   decoratorClass?: string
}

const __TagPlate = ({icons, text, decoratorClass}: Props): JSX.Element => (
   <TagWrapper classDecorator={`--plate ${decoratorClass || ''}`}>
      {icons.map((icon, index) => <FontAwesomeIcon key={`icon_plate_${index}`} icon={icon} />)}
      <span>{text}</span>
   </TagWrapper>
)

export default __TagPlate