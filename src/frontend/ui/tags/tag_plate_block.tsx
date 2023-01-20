import * as React from 'react'
import TagWrapper from './_tag/tag'
import CardIcon from '@frontend/common/card/card_icon'

type Props = {
   icon: string
   text: string
   decoratorClass?: string
}

const __TagPlateBlock = ({icon, text, decoratorClass}: Props): JSX.Element => (
   <TagWrapper classDecorator={`--plate ${decoratorClass || ''}`}>
      <CardIcon icon={icon} height={12} alt={icon}/>
      <span>{text}</span>
   </TagWrapper>
)

export default __TagPlateBlock