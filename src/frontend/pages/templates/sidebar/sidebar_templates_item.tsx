import * as React from 'react'
import {Utils} from '@kue-space/common'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock} from '@fortawesome/pro-light-svg-icons/faClock'
import {StateTemplateItem} from '@intf/State'
import {getActiveRevisions, isActiveTemplateSaved, isWidgetGroupBusy} from '@state/selectors'
import {SidebarTemplatesProps} from '@intf/Sidebar'

import UI from '@frontend/ui/ui'
import SidebarTemplatesItemRevision from './sidebar_templates_item_revision'
import {WidgetGroups} from '@root/properties'

type Props = SidebarTemplatesProps & {
   template: StateTemplateItem
}

const SidebarTemplatesItem = ({state, events, template}: Props) => {
   const isTemplateActive = template._id === state.activeTemplate.templateId
   const isAllSaved = isActiveTemplateSaved(state)
   const {published} = getActiveRevisions(state)
   const {selectedTemplate} = state
   const selectedRevision = selectedTemplate.revision

   const isTemplateSelected = template._id === selectedTemplate.id

   const classNames = ['--kue-bs-templates-item']
   const baseClassName = classNames[0]

   if (isTemplateActive) {
      classNames.push('--active')
   }
   if (!isAllSaved) {
      classNames.push('--changes')
   }
   if (!!published && selectedRevision === published) {
      classNames.push('--published')
   }

   const created = Utils.isoToDateTime(template.created)
   const createdTillToday = Utils.timePassedTillNow(template.created)
   return (
      <div id="builder-sidebar-templates-item" className={classNames.join(' ')}>
         <header className={`${baseClassName}-frame`}>
            <span className="--template-name">{template.name}</span>
            <span className="--template-headline">{template.headline}</span>
            <span className="--created">
               <FontAwesomeIcon icon={faClock}/> created {createdTillToday} ago, on {created}
            </span>
         </header>
         <main className={`${baseClassName}-versions`}>
            <UI.DimmerArea
               inverted={false}
               active={isTemplateSelected && isWidgetGroupBusy(state, WidgetGroups.MixedSavingRevision)}
               content={{
                  header: 'Please wait...',
                  subheader: 'We are updating your revision list'
               }}>
               <ul className="--list">
                  {
                     template.revisions.map(revision => (
                        <li key={`r_${revision.revision}`}>
                           <SidebarTemplatesItemRevision
                              state={state}
                              events={events}
                              revision={revision}
                              template={template}
                           />
                        </li>
                     ))
                  }
               </ul>
            </UI.DimmerArea>
         </main>
      </div>
   )
}

export default SidebarTemplatesItem