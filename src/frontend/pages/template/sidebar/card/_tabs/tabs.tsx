import * as React from 'react'
import {Tab} from 'semantic-ui-react'
import {SemanticPane} from '@kue-space/common'

type Props = {
   tabs: SemanticPane[]
}

const SidebarTemplateCardTabsWrapper = ({tabs}: Props): JSX.Element => {
   return (
      <Tab className="--kue-bs-tabs" panes={tabs}/>
   )
}

export default SidebarTemplateCardTabsWrapper
