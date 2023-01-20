import React, {useEffect} from 'react'
import {WidgetGroups} from '@root/properties'
import {unsetWidgets} from '@state/combined'

import {Dispatcher, RootState} from '@intf/State'

type Args = {
   state: RootState
   dispatcher: Dispatcher
}

const usePrev = (value: any) => {
   const ref = React.useRef()
   React.useEffect(() => {
      ref.current = value
   })
   return ref.current
}

function onSelectAnotherBlockHook({state, dispatcher}: Args) {

   const selectedBlock = state.activeTemplate.selectedBlock
   const _selectedBlock = usePrev(selectedBlock)

   useEffect(() => {
      if (selectedBlock && (_selectedBlock !== selectedBlock)) {
         unsetWidgets(state, dispatcher, WidgetGroups.Modals)
      }
   }, [selectedBlock])

}

export default onSelectAnotherBlockHook
