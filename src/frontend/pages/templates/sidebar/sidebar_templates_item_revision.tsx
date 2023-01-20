import * as React from 'react'
import {Checkbox, Icon} from 'semantic-ui-react'
import {TPayloads, Utils} from '@kue-space/common'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock} from '@fortawesome/pro-light-svg-icons/faClock'
import {faCodeBranch} from '@fortawesome/pro-light-svg-icons/faCodeBranch'
import {faCardsBlank} from '@fortawesome/pro-light-svg-icons/faCardsBlank'
import {faCloudArrowUp} from '@fortawesome/pro-light-svg-icons/faCloudArrowUp'
import {faTrash} from '@fortawesome/pro-light-svg-icons/faTrash'
import {SidebarTemplatesProps} from '@intf/Sidebar'

import {AsyncProcesses, Widgets} from '@root/properties'
import UI from '@frontend/ui/ui'
import SidebarTemplatesItemSaveAsNewForm from './sidebar_templates_item_save_form'
import {
   getActiveRevisions,
   getAsyncProcess,
   isActiveTemplateSaved,
   isWidgetActive
} from '@state/selectors'
import {isAsyncProcessTriggered} from '@helpers/utils'


type Props = SidebarTemplatesProps & {
   revision: TPayloads.TUserProfileTreeRevisionFragment
   template: TPayloads.TUserProfileTemplateFragment
}

const SidebarTemplatesItemRevision = ({state, events, revision, template}: Props) => {
   const whenNothingChangedInRevision = isActiveTemplateSaved(state)
   const whenSomethingChangedInRevision = !whenNothingChangedInRevision
   const whenSelectedRevisionIsDefined = !!state.selectedTemplate.revision
   const whenThisTemplateHasOnlyOneRevisionLeft = template.revisions.length === 1
   const whenThisTemplateIsSelected = template._id === state.selectedTemplate.id
   const whenThisRevisionIsSelected = revision.revision === state.selectedTemplate.revision && whenThisTemplateIsSelected
   const whenThisRevisionMatchesBase = revision.revision === getActiveRevisions(state).base
   const whenThisRevisionMatchesPublished = revision.revision === template.version.revision
   const whenThisRevisionIsPublished = !!template.version.revision && template.version.revision === revision.revision
   const whenIsDeleting = isAsyncProcessTriggered(getAsyncProcess(state, AsyncProcesses.DeleteRevision))

   const disabled = whenSomethingChangedInRevision
   const checked = whenSelectedRevisionIsDefined && whenThisRevisionIsSelected
   const active = whenThisRevisionMatchesBase && whenThisTemplateIsSelected
   const formActive = active && isWidgetActive(state, Widgets.TemplatesRevisionSaveAsNewForm)

   const classNames = ['--kue-bs-templates-item-revision']
   const baseClassName = classNames[0]

   if (active) {
      classNames.push('--active')
   }

   if (disabled) {
      classNames.push('--disabled')
   }

   const created = Utils.timestampToDateTime(revision.timestamp)

   return (
      <div className={classNames.join(' ')}>
         <div className={`${baseClassName}-summary`}>
            <div className="--checkbox">
               <span className="--revision-blocks">
                  <><FontAwesomeIcon icon={faCardsBlank}/>{revision.nodes}</>
               </span>
               <Checkbox
                  value={revision.revision}
                  name="template"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => events.onSelectRevisionBoxClick(template._id, revision.revision)}/>
            </div>
            <div className="--label">
               <span className="--revision-label">{whenThisRevisionIsPublished ? `Published version ${template.version.major}` : revision.label}</span>
               <span className="--revision-comment">{whenThisRevisionIsPublished ? template.version.comment : revision.comment}</span>
               <div className="--details">
                  <span className="--revision-created">
                     <FontAwesomeIcon icon={faClock}/>{created}
                  </span>
                  <span className="--revision-id">
                     {active && whenSomethingChangedInRevision && <Icon name="dot circle" color="red"/>}
                     {
                        whenThisRevisionIsPublished
                           ? <UI.Tag.Release version={template.version.major} revision={template.version.revision}/>
                           : <><FontAwesomeIcon icon={faCodeBranch}/>{revision.revision}</>
                     }
                  </span>
               </div>
               {
                  (whenThisRevisionIsSelected && !whenThisRevisionMatchesPublished) && (
                     <div className="--buttons">
                        <UI.Button.Classic
                           id={`builder-sidebar-${revision.revision}-publish`}
                           onClick={() => events.onPublishTemplateButtonClick(template._id, revision.revision)}
                           active={false}
                           disabled={whenSomethingChangedInRevision || !active}
                           small={true}
                           role="publish"
                           caption="Publish"
                           icon={faCloudArrowUp} />
                        <UI.Button.Classic
                           id={`builder-sidebar-${revision.revision}-delete`}
                           onClick={() => events.onDeleteRevisionButtonClick(template._id, revision.revision)}
                           disabled={whenSomethingChangedInRevision || whenIsDeleting || whenThisTemplateHasOnlyOneRevisionLeft}
                           small={true}
                           role="critical"
                           caption="Delete"
                           icon={faTrash} />
                     </div>
                  )
               }
            </div>
         </div>
         {
            formActive && (
               <div className={`${baseClassName}-form`}>
                  <SidebarTemplatesItemSaveAsNewForm
                     onFormClose={events.onSaveAsNewFormCloseButtonClick}
                     onSaveAsNewButtonClick={events.onSaveAsNewButtonClick}
                  />
               </div>
            )
         }
      </div>
   )
}


export default SidebarTemplatesItemRevision