import * as React from 'react'
import {useState} from 'react'
import {common_RevisionID} from '@kue-space/common'
import {faCloudArrowUp} from '@fortawesome/pro-light-svg-icons/faCloudArrowUp'

import UI from '@frontend/ui/ui'

type Props = {
   templateId: string
   version: number
   revision: common_RevisionID
   allSaved: boolean
   onPublishButtonClick(templateId: string, revision: common_RevisionID, comment: string)
}

const ModalTemplatePublishForm = ({templateId, version, revision, allSaved, onPublishButtonClick}: Props): JSX.Element => {

   const [comment, setComment] = useState('')

   const isPublishButtonDisabled = !allSaved || comment.length === 0

   return (
      <UI.Form name="revision-publishing-form" buttons={(
         <UI.Button.Classic
            id="modal-button--revision-publish"
            caption="Publish"
            role="publish"
            disabled={isPublishButtonDisabled}
            onClick={() => onPublishButtonClick(templateId, revision, comment)}
            icon={faCloudArrowUp}/>
      )}>

         <div className="--chunk">
            <span className="--caption">Version</span>
            <span className="--hint">The template will be published under the new version:</span>
            <UI.Tag.Release version={version + 1} revision={revision}/>
         </div>
         <div className="--chunk">
            <span className="--caption">Changes</span>
            <span className="--hint --spacer">Describe the version changes and improvements for the learners</span>
         </div>
         <div className="--chunk">
            <UI.Input.Textarea
               name="comment"
               value={comment}
               placeholder="What has changed in this version?"
               onChange={(name, value) => setComment(value as any)}
            />
         </div>
      </UI.Form>
   )
}

export default ModalTemplatePublishForm
