import * as React from 'react'
import {ReactNode} from 'react'
import {ToolbarEvents} from '@intf/Toolbar'
import {RootState} from '@intf/State'
import {faSitemap} from '@fortawesome/pro-light-svg-icons/faSitemap'
import {faCardsBlank} from '@fortawesome/pro-light-svg-icons/faCardsBlank'
import {faListTimeline} from '@fortawesome/pro-light-svg-icons/faListTimeline'

import {isWidgetActive} from '@state/selectors'
import {Widgets} from '@root/properties'

import UI from '@frontend/ui/ui'
import {faGear} from '@fortawesome/pro-light-svg-icons/faGear'

type Props = {
   state: RootState
   events: ToolbarEvents
   children?: ReactNode
}

const Toolbar = ({events, state, children}: Props) => {
   return (
      <aside id="kue-builder-toolbar" className="--kue-bt">
         <nav className="--kue-bt-nav">
            <ol>
               <li className="--kue-bt-nav-item --logo">
                  <UI.KueLogo width={30} />
               </li>
               <li className="--kue-bt-nav-item">
                  <UI.Button.Icon
                     id="builder-toolbar-button--cards"
                     disabled={false}
                     onClick={events.onSelectCardsListPageButtonClick}
                     active={isWidgetActive(state, Widgets.CardsListPage)}
                     icon={faCardsBlank} />
               </li>
               <li className="--kue-bt-nav-item">
                  <UI.Button.Icon
                     id="builder-toolbar-button--templates"
                     disabled={false}
                     onClick={events.onSelectTemplatesListPageButtonClick}
                     active={isWidgetActive(state, Widgets.TemplatesListPage)}
                     icon={faListTimeline} />
               </li>
               <li className="--kue-bt-nav-item">
                  <UI.Button.Icon
                     id="builder-toolbar-button--template"
                     onClick={events.onSelectTemplateBrowsePageButtonClick}
                     active={isWidgetActive(state, Widgets.TemplateBrowsePage)}
                     disabled={!state.activeTemplate.base}
                     style={{padding: '13px 16px'}}
                     icon={faSitemap} />
               </li>
               <li className="--kue-bt-nav-item">
                  <UI.Button.Icon
                     id="builder-toolbar-button--settings"
                     onClick={events.onSelectTemplateSettingsPageButtonClick}
                     active={isWidgetActive(state, Widgets.TemplateSettingsPage)}
                     disabled={!state.activeTemplate.base || state.activeTemplate.local}
                     icon={faGear} />
               </li>
            </ol>
         </nav>
         {children}
      </aside>
   )
}

export default Toolbar
