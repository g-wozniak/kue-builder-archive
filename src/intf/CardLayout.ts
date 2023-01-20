import {CardWidgets} from '@kue-space/common'
import {SidebarTemplateEvents} from '@intf/Sidebar'
import {RootState} from '@intf/State'

export type CardLayoutProps = {
   layout: string // common_CardLayouts
   state: RootState
   widgets: CardWidgets
   events: SidebarTemplateEvents
}