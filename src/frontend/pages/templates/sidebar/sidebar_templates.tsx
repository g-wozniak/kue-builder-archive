import * as React from 'react'
import orderBy from 'lodash/orderBy'
import {faShareNodes} from '@fortawesome/pro-light-svg-icons/faShareNodes'
import {SidebarTemplatesProps} from '@intf/Sidebar'

import {isActiveTemplateLocal, isActiveTemplateSaved} from '@state/selectors'
import UI from '@frontend/ui/ui'
import SidebarTemplatesItem from './sidebar_templates_item'
import SidebarTemplatesLoadButton from './sidebar_templates_load_button'
import SidebarTemplatesAddButton from './sidebar_templates_add_button'
import config from '@root/config'

type Props = SidebarTemplatesProps

const SidebarTemplates = ({state, events}: Props) => {
   const {templates, selectedTemplate} = state
   const whenTemplateIsNotSelected = !selectedTemplate.id
   const whenTemplateRevisionIsNotSelected = !selectedTemplate.revision
   const whenTemplateIsNewlyCreatedAndNotSavedToBackend = isActiveTemplateLocal(state)
   const whenActiveTemplateIsNotSaved = !isActiveTemplateSaved(state)
   const whenSelectedTemplateRevisionIsAlreadyActive = selectedTemplate.revision === state.activeTemplate.base && selectedTemplate.id === state.activeTemplate.templateId
   const whenNewTemplatesLimitReached = state.templates.length >= config.limits.templates
   return (
      <UI.Window
         caption="Pathway templates"
         icon={faShareNodes}
         buttons={[
            <SidebarTemplatesAddButton
               key="t-add"
               active={false}
               disabled={whenActiveTemplateIsNotSaved || whenNewTemplatesLimitReached}
               onLoadButtonClick={events.onAddButtonClick}
            />,
            <SidebarTemplatesLoadButton
               key="t-load"
               active={false}
               disabled={
                  whenTemplateIsNotSelected ||
                  whenTemplateRevisionIsNotSelected ||
                  whenTemplateIsNewlyCreatedAndNotSavedToBackend ||
                  whenActiveTemplateIsNotSaved ||
                  whenSelectedTemplateRevisionIsAlreadyActive
               }
               onLoadButtonClick={events.onLoadButtonClick}
            />
         ]}>
            {
               orderBy(templates, ['updated'], ['desc']).map((template) => (
                  <SidebarTemplatesItem
                     key={`t-${template._id}`}
                     state={state}
                     events={events}
                     template={template}
                  />
               ))
            }
      </UI.Window>
   )
}

export default SidebarTemplates