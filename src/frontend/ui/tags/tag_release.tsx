import * as React from 'react'
import {common_WantToBeRevisionID, Utils} from '@kue-space/common'

import TagWrapper from './_tag/tag'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/pro-light-svg-icons/faUpload'
import {faCodeBranch} from '@fortawesome/pro-light-svg-icons/faCodeBranch'


type Props = {
   version: number
   withIcon?: boolean
   revision?: common_WantToBeRevisionID
}

const __TagRelease = ({version, withIcon, revision}: Props) => (
   <TagWrapper classDecorator="--release">
      {withIcon && <FontAwesomeIcon icon={faUpload}/>}
      <span>
         {Utils.versionIndicator(version)}
         {revision ? <FontAwesomeIcon icon={faCodeBranch}/> : ''}
         {revision ? revision.toUpperCase() : ''}
      </span>
   </TagWrapper>
)

export default __TagRelease