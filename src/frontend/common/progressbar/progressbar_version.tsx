import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeCommit} from '@fortawesome/pro-light-svg-icons/faCodeCommit'
import UI from '@frontend/ui/ui'

import {ProgressbarVersionProps} from '@intf/Progressbar'

const ProgressbarVersion = ({templateRevision, version, state}: ProgressbarVersionProps) => {
   const unsavedSteps = state.activeTemplate.unsavedSteps
   const unsavedBlocks = state.activeTemplate.unsavedBlocks
   const hasEverBeenPublished = version.major > 0 && version.published
   const nothingChanged = unsavedSteps + unsavedBlocks === 0
   const sameAsPublished = (templateRevision && (templateRevision.revision === version.revision))

   const decorators: string[] = []

   if (!hasEverBeenPublished) {
      decorators.push('--never-published')
   }

   if (sameAsPublished) {
      decorators.push('--as-published')
   }

   if (nothingChanged) {
      decorators.push('--no-changes')
   } else {
      decorators.push('--with-changes')
   }

   return (
      <div className={`--kue-b-progressbar-version ${decorators.join(' ')}`}>
         <div className="--version">
            {hasEverBeenPublished && <UI.Tag.Release version={version.major} />}
            <span className="--connector">
               <FontAwesomeIcon icon={faCodeCommit}/>
            </span>
            <UI.Tag.Revision name={templateRevision?.label}/>
            <UI.Tag.Steps steps={unsavedSteps}/>
            <UI.Tag.Blocks blocks={unsavedBlocks}/>
         </div>
      </div>
   )
}

export default ProgressbarVersion
