import * as React from 'react'
import Popup from '@frontend/ui/popup/popup'
import WindowButton from './window_button'

type Props = {
   text: string
}

const WindowPopupButton = ({text}: Props) => {
   return (
      <WindowButton>
         <Popup
            content={text}
            help={true}
         />
      </WindowButton>
   )
}

export default WindowPopupButton
