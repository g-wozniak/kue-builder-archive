import * as React from 'react'
import {isEqual} from 'lodash'
import {BlockDataProps} from '@kue-space/common'
import {SidebarTemplateEvents} from '@intf/Sidebar'
import {AmendableBlockDataPropsKeys} from '@intf/Config'
import {AmendableBlockDataProps} from '@intf/Common'

import config from '@root/config'
import UI from '@frontend/ui/ui'
import SidebarTemplateCardTabWrapper from '../_tabs/tab'

type Props = {
   type: string
   events: SidebarTemplateEvents
   details: AmendableBlockDataProps
   initialState: Partial<BlockDataProps>
   setCardDetails: React.Dispatch<React.SetStateAction<AmendableBlockDataProps>>
}

const SidebarTemplateCardDetails = ({type, details, setCardDetails, initialState, events}: Props): JSX.Element => {
   return (
      <SidebarTemplateCardTabWrapper name="card">
         <UI.Form name="card-details-form" buttons={(
            <UI.Button.Classic
               id="builder-sidebar-button--submit-card-details"
               caption="Apply"
               disabled={isEqual(details, initialState)}
               onClick={() => {
                  events.onCardDetailsSubmitButtonClick(details)
               }}/>
         )}>
            {
               (Object.keys(details) as unknown as AmendableBlockDataPropsKeys[]).map(field => {
                  const fieldConfig = config.cards.details[field]
                  const blockConfig = config.blocks[type]
                  const isSettable = blockConfig.hiddenDetails.indexOf(field) === -1
                  return isSettable
                     ? <UI.Input.Accordion
                        key={`card_input_${field}`}
                        name={field}
                        label={fieldConfig.label}
                        description={fieldConfig.description}
                        placeholder={fieldConfig.placeholder}
                        options={fieldConfig.options}
                        inputType={fieldConfig.inputType}
                        inputLabel={fieldConfig.inputLabel}
                        initialValue={initialState[field]}
                        value={details[field]}
                        setInputs={setCardDetails}
                        />
                     : null
               })
            }
         </UI.Form>
      </SidebarTemplateCardTabWrapper>
   )
}

export default SidebarTemplateCardDetails
