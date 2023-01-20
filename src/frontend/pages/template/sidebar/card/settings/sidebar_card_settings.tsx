import * as React from 'react'
import {common_CardTypes} from '@kue-space/common'
import {SidebarTemplateProps} from '@intf/Sidebar'

import UI from '@frontend/ui/ui'
import SidebarTemplateCardTabWrapper from '../_tabs/tab'
import SidebarCardSettingsLink from './sidebar_card_settings_link'
import SidebarCardSettingsDelete from './sidebar_card_settings_delete'

type Props = SidebarTemplateProps

const SidebarCardSettings = ({selectedBlockNode, nodes, edges, events}: Props) => {
   const isGoalBlock = selectedBlockNode.type === common_CardTypes.Goal
   return (
      <SidebarTemplateCardTabWrapper name="settings">
         <UI.Property label="Properties" properties={[
            {
               key: 'ID:',
               value: selectedBlockNode.id
            }
         ]}/>
         {
            !isGoalBlock && (
               <SidebarCardSettingsLink
                  selectedBlock={selectedBlockNode}
                  nodes={nodes}
                  edges={edges}
                  onClick={events.onCardSettingsChangeLinkButtonClick}
               />
            )}
         {
            !isGoalBlock && (
               <SidebarCardSettingsDelete
                  onClick={() => events.onCardSettingsDeleteButtonClick(selectedBlockNode.id)}/>
            )}
      </SidebarTemplateCardTabWrapper>
   )
}

export default SidebarCardSettings
