import * as React from 'react'
import {faPlus} from '@fortawesome/pro-light-svg-icons/faPlus'

import UI from '@frontend/ui/ui'


type Props = {
   active: boolean
   disabled: boolean
   onLoadButtonClick(): void
}

const SidebarTemplatesAddButton = ({active, disabled, onLoadButtonClick}: Props): JSX.Element => {
   return (
      <UI.Window.ButtonWrapper>
         <UI.Popup
            content="Create a new template"
            disabled={true}
            trigger={
               <UI.Button.Icon
                  id="builder-sidebar-button--new-template"
                  disabled={disabled}
                  onClick={onLoadButtonClick}
                  active={active}
                  icon={faPlus}/>
            }>
         </UI.Popup>
      </UI.Window.ButtonWrapper>
   )
}

export default SidebarTemplatesAddButton