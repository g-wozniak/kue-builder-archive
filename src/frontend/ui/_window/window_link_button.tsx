import * as React from 'react'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import WindowButton from './window_button'


type Props = {
   url: string
   icon: IconDefinition
}

const WindowLinkButton = ({url, icon}: Props) => {
   return (
      <WindowButton>
         <a href={url} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={icon}/></a>
      </WindowButton>
   )
}

export default WindowLinkButton
