import * as React from 'react'
import {faDownload} from '@fortawesome/pro-light-svg-icons/faDownload'
import {common_RevisionID} from '@kue-space/common'

import UI from '@frontend/ui/ui'

type Props = {
   active: boolean
   disabled: boolean
   onLoadButtonClick(templateId: string, revision: common_RevisionID): void
}

const SidebarTemplatesLoadButton = ({active, disabled, onLoadButtonClick}: Props): JSX.Element => {
   return (
      <UI.Window.ButtonWrapper>
         <UI.Popup
            content="Select an existing template or create a new pathway template"
            disabled={!disabled}
            trigger={
               <UI.Button.Icon
                  id="builder-sidebar-button--select-template"
                  disabled={disabled}
                  onClick={onLoadButtonClick}
                  active={active}
                  icon={faDownload}/>
            }>
         </UI.Popup>
      </UI.Window.ButtonWrapper>
   )
}

export default SidebarTemplatesLoadButton