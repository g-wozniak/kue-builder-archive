import {useEffect} from 'react'
import {WidgetGroups} from '@root/properties'
import {unsetWidgets} from '@state/combined'

import {Dispatcher, RootState} from '@intf/State'

type Args = {
   state: RootState
   dispatcher: Dispatcher
}

function onDeselectBlockHook({state, dispatcher}: Args) {
   const selectedBlock = state.activeTemplate.selectedBlock
   useEffect(() => {
      if (!selectedBlock) {
         unsetWidgets(state, dispatcher, WidgetGroups.Modals)
      }
   }, [selectedBlock])
}

export default onDeselectBlockHook
