import * as React from 'react'
import {ReactNode, useMemo} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSealQuestion} from '@fortawesome/pro-light-svg-icons/faSealQuestion'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'

import __WindowButton from './window_button'
import WindowLinkButton from './window_link_button'
import WindowPopupButton from './window_popup_button'
import DimmerArea from '../_dimmer/dimmer_area'

interface BaseProps {
   caption: string
   icon?: IconDefinition
   busy?: boolean
   buttons?: ReactNode
   helpUrl?: string
   help?: string
   modal?: boolean
   children: ReactNode
}

export interface PropsWithHelp extends BaseProps {
   helpUrl: string
   help?: never
}

export interface PropsWithHint extends BaseProps {
   helpUrl: string
   help?: never
}

export interface PropsWithoutHintOrHelp extends BaseProps {
   helpUrl?: never
   hint?: never
}

type Props = PropsWithHelp | PropsWithHint | PropsWithoutHintOrHelp

const Window = ({caption, icon, modal, busy, helpUrl, help, buttons, children}: Props): JSX.Element => {

   const hasNoHelp = !help && !helpUrl

   const hasNoButtons = hasNoHelp && !buttons

   const captionIcon = useMemo(() => icon ? <FontAwesomeIcon icon={icon}/> : '', [icon])

   return (
      <section className={`--kue-b-window ${modal ? '--modal' : ''}`}>
         <DimmerArea inverted={false} active={!!busy}>
            <header className="--kue-b-window-header">
               <span className={`--caption ${hasNoButtons ? '--no-buttons' : ''}`}>
                  {icon && <span className="--caption-icon">{captionIcon}</span>}
                  <span className="--caption-text">{caption}</span>
               </span>
               {
                  helpUrl && <WindowLinkButton url={helpUrl} icon={faSealQuestion}/>
               }
               {
                  help && <WindowPopupButton text={help}/>
               }
               {buttons}
            </header>
            <main className="--kue-b-window-body">
               {children}
            </main>
         </DimmerArea>
      </section>
   )
}

Window.ButtonWrapper = __WindowButton

export default Window
