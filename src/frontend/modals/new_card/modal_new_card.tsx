import React from 'react'
import {ModalNewCardEvents} from '@intf/Modal'
import {RootState} from '@intf/State'
import {SelectedBlock} from '@intf/Common'

import config from '@root/config'
import {WidgetGroups, Widgets} from '@root/properties'
import {isWidgetActive, isWidgetGroupBusy} from '@state/selectors'

import UI from '@frontend/ui/ui'
import ModalWrapper from '../_modal/modal'


type Props = {
   node: SelectedBlock | undefined
   state: RootState
   events: ModalNewCardEvents
}

const ModalNewCard = ({node, state, events}: Props): JSX.Element => {
   const active = isWidgetActive(state, Widgets.NewCardModal)
   if (active && node && node.type) {
      const blockConfig = config.blocks[node.type]
      const parentFor = blockConfig.parentFor
      return (
         <ModalWrapper
            name="block-adding"
            caption="Add a new card"
            onClose={events.onCloseContext}
            busy={isWidgetGroupBusy(state, WidgetGroups.Modals)}
         >
            <section>
               <span className="--text">Choose the new card type which will be attached to the selected card</span>
               {
                  parentFor.map((allowedBlockType) => {
                     const allowedBlockConfig = config.blocks[allowedBlockType]
                     return (
                        <UI.Button.Pane
                           key={`${node.id}_modal_option_${allowedBlockType}`}
                           caption={allowedBlockConfig.caption}
                           description={allowedBlockConfig.description}
                           icon={allowedBlockConfig.icon}
                           classDecorator={`--block-${allowedBlockConfig.slug}`}
                           onClick={() => events.onNewCardPaneClick(node, allowedBlockType)}
                        />
                     )
                  })
               }
            </section>
         </ModalWrapper>
      )
   }

   return <></>

}



export default ModalNewCard
