import * as React from 'react'
import UI from '@frontend/ui/ui'
import SidebarCardSettingWrapper from './_setting/sidebar_card_setting'

type Props = {
   onClick()
}

const SidebarCardSettingsDelete = ({onClick}: Props) => {
   return (
      <SidebarCardSettingWrapper label="Delete card" decoratorClass="delete">
         <span className="--text"><strong>Warning!</strong> You will delete THE SELECTED CARD and ALL THE CARDS ASSOCIATED WITH IT. Remember, you can change the existing card link by selecting a different source card.</span>
         <UI.Button.Classic
            id="kue-builder-template-settings-button--delete"
            disabled={false}
            role="critical"
            onClick={onClick}
            caption="Yes, confirm deletion"
         />
      </SidebarCardSettingWrapper>
   )
}

export default SidebarCardSettingsDelete
