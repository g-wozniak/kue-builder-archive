import * as React from 'react'
import {ReactNode} from 'react'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {faXmark} from '@fortawesome/pro-light-svg-icons/faXmark'

import UI from '@frontend/ui/ui'

type Props = {
   caption: string
   icon?: IconDefinition
   name: string
   busy: boolean
   onClose(): void
   children: ReactNode
}

const ModalWrapper = ({name, icon, caption, busy, onClose, children}: Props): JSX.Element => {
   return (
      <section className={`--kue-modal --kue-modal-${name}`} id={`builder-modal-${name}`}>
         <UI.Window caption={caption} icon={icon} busy={busy} modal={true} buttons={
            <UI.Window.ButtonWrapper>
               <UI.Button.Icon
                  id={`builder-modal-button--close-${name}`}
                  disabled={false}
                  onClick={onClose}
                  icon={faXmark}
               />
            </UI.Window.ButtonWrapper>
         }>{children}</UI.Window>
      </section>
   )
}

export default ModalWrapper
