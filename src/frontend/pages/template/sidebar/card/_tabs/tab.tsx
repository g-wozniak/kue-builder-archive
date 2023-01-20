import * as React from 'react'
import {Tab} from 'semantic-ui-react'

type Props = {
   name: 'card' | 'layout' | 'settings'
   children: React.ReactNode
}

const SidebarTemplateCardTabWrapper = ({name, children}: Props): JSX.Element => {

   return (
      <Tab.Pane className={`--kue-bs-template-block-${name} --kue-bs-tab`}>
         {children}
      </Tab.Pane>
   )
}

export default SidebarTemplateCardTabWrapper
