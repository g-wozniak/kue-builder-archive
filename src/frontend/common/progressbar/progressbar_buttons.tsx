import * as React from 'react'
import {faArrowRightToLine} from '@fortawesome/pro-light-svg-icons/faArrowRightToLine'
import {faArrowRightToArc} from '@fortawesome/pro-light-svg-icons/faArrowRightToArc'
import {faArrowLeftToLine} from '@fortawesome/pro-light-svg-icons/faArrowLeftToLine'
import {faRightFromBracket} from '@fortawesome/pro-light-svg-icons/faRightFromBracket'
import {ProgressbarButtonsProps} from '@intf/Progressbar'

import UI from '@frontend/ui/ui'
import {WidgetGroups} from '@root/properties'
import {getActiveTemplateItem, isActiveTemplateLocal, isActiveTemplateSaved, isWidgetGroupBusy} from '@state/selectors'
import config from '@root/config'


const ProgressbarButtons = ({templateRevision, version, state, events}: ProgressbarButtonsProps) => {
   const template = getActiveTemplateItem(state)
   const whenTemplateWasEverSavedToBackend = !isActiveTemplateLocal(state)
   const whenTemplateIsNewlyCreatedAndNotSavedToBackend = !whenTemplateWasEverSavedToBackend
   const whenNoChangesInTemplate = isActiveTemplateSaved(state)
   const whenSomethingChangedInTemplate = !whenNoChangesInTemplate
   const whenProgressbarWidgetGroupIsBusy = isWidgetGroupBusy(state, WidgetGroups.MixedSavingRevision)
   const whenActiveRevisionIsPublished = (templateRevision && (templateRevision.revision === version.revision))
   const whenNewRevisionsLimitReached = template ? template.revisions.length >= config.limits.revisions : true

   return (
      <div className="--kue-b-progressbar-buttons">
         <nav>
            <ol className="--nav">
               <li>
                  <UI.Button.Icon
                     id="builder-progressbar-button--discard"
                     icon={faArrowLeftToLine}
                     caption="Discard"
                     disabled={whenNoChangesInTemplate && whenTemplateWasEverSavedToBackend}
                     onClick={events.onDiscardUnsavedButtonClick}
                  />
               </li>
               <li>
                  <UI.Button.Icon
                     id="builder-progressbar-button--save"
                     icon={faArrowRightToLine}
                     caption="Save"
                     loading={whenProgressbarWidgetGroupIsBusy}
                     disabled={whenActiveRevisionIsPublished || whenNoChangesInTemplate || whenProgressbarWidgetGroupIsBusy}
                     onClick={events.onSaveButtonClick}
                  />
               </li>
               <li>
                  <UI.Button.Icon
                     id="builder-progressbar-button--save-new"
                     icon={faArrowRightToArc}
                     caption="Save new"
                     loading={whenProgressbarWidgetGroupIsBusy}
                     disabled={whenNoChangesInTemplate || whenTemplateIsNewlyCreatedAndNotSavedToBackend || whenNewRevisionsLimitReached || whenProgressbarWidgetGroupIsBusy}
                     onClick={events.onSaveAsNewButtonClick}
                  />
               </li>
               <li>
                  <UI.Button.Icon
                     id="builder-progressbar-button--exit"
                     icon={faRightFromBracket}
                     caption="Exit"
                     disabled={whenSomethingChangedInTemplate}
                     onClick={events.onExitButtonClick}
                  />
               </li>
            </ol>
         </nav>
      </div>
   )
}

export default ProgressbarButtons
