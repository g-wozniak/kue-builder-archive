import React, {useCallback, useEffect} from 'react'
import {WidgetGroups, Widgets} from '@root/properties'
import {TPayloads} from '@kue-space/common'
import {useEdgesState, useNodesState} from 'react-flow-renderer/nocss'
import {ToolbarEvents} from '@intf/Toolbar'
import {Action} from '@intf/State'
import {Requests} from '@intf/Requests'
import {dispatch, useAppState} from '@state/state'
import {isWidgetActive, isWidgetGroupActive} from '@state/selectors'
import {deselectBlockIfSelected, unsetWidgets} from '@state/combined'
import {
   toggleCardsListPage,
   toggleTemplateBrowsePage,
   toggleTemplateSettingsPage,
   toggleTemplatesListPage
} from '@state/actions'

import Toolbar from '@frontend/common/toolbar/toolbar'
import CardsContainer from '@frontend/pages/cards/container'
import BuilderContainer from '@frontend/builder'


type Props = {
   returnUrl: string
   bffRequests: Requests
   userProfile: TPayloads.TUserProfileFromBackendPayload
}

const KueBuilderApp = ({userProfile, returnUrl, bffRequests}: Props) => {
   const [state, setState] = useAppState(userProfile)
   const dispatcher = useCallback((action: Action<any>) => dispatch(setState, action), [setState, dispatch])

   const [nodes, setNodes, onNodesChange] = useNodesState([])
   const [edges, setEdges, onEdgesChange] = useEdgesState([])

   /**
    * All events accessible within the Toolbar
    **/
   const toolbarEvents: ToolbarEvents = {

      // When clicking on `Cards` button in the toolbar
      onSelectCardsListPageButtonClick: useCallback(() => {
         if (!isWidgetActive(state, Widgets.CardsListPage)) {
            unsetWidgets(state, dispatcher, WidgetGroups.BuilderLayout)
            deselectBlockIfSelected(state, dispatcher)
            dispatcher(toggleCardsListPage(true))
         }
      }, [state, dispatcher]),

      // When clicking on `Template list` button in the toolbar
      onSelectTemplatesListPageButtonClick: useCallback(() => {
         if (!isWidgetActive(state, Widgets.TemplatesListPage)) {
            deselectBlockIfSelected(state, dispatcher)
            unsetWidgets(state, dispatcher, WidgetGroups.CardsListPageLayout)
            dispatcher(toggleTemplatesListPage(true))
         }
      }, [state, dispatcher]),

      // When clicking on `Template browse` button in the toolbar
      onSelectTemplateBrowsePageButtonClick: useCallback(() => {
         if (!isWidgetActive(state, Widgets.TemplateBrowsePage)) {
            unsetWidgets(state, dispatcher, WidgetGroups.CardsListPageLayout)
            dispatcher(toggleTemplateBrowsePage(true))
         }
      }, [state, dispatcher]),

      // When clicking on `Template settings` button in the toolbar
      onSelectTemplateSettingsPageButtonClick: useCallback(() => {
         if (!isWidgetActive(state, Widgets.TemplateSettingsPage)) {
            unsetWidgets(state, dispatcher, WidgetGroups.CardsListPageLayout)
            dispatcher(toggleTemplateSettingsPage(true))
         }
      }, [state, dispatcher])
   }

   useEffect(() => {
      // REMOVE WHEN ADD REQ. HOOK
      // Toggle initial UI panel on mount
      dispatcher(toggleTemplatesListPage(true))
   }, [])


   return (
      <div id="kue-builder">
         <Toolbar
            events={toolbarEvents}
            state={state}
         />
         <main id="kue-builder-main" className="--kue-b">
            {isWidgetGroupActive(state, WidgetGroups.CardsListPageLayout) && (
               <CardsContainer/>
            )}
            {isWidgetGroupActive(state, WidgetGroups.BuilderLayout) && (
               <BuilderContainer
                  state={state}
                  dispatcher={dispatcher}
                  bffRequests={bffRequests}
                  toolbarEvents={toolbarEvents}
                  returnUrl={returnUrl}
                  flow={{nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange}}
               />
            )}
         </main>
      </div>
   )
}

export default KueBuilderApp
