import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightFromLine} from '@fortawesome/pro-light-svg-icons/faArrowRightFromLine'

import TagWrapper from './_tag/tag'

type Props = {
   steps: number
}

const __TagSteps = ({steps}: Props): JSX.Element => (
   <TagWrapper classDecorator={`--steps ${steps ===  0 ? '--disabled' : ''}`}>
      <FontAwesomeIcon icon={faArrowRightFromLine} />
      <span>{steps === 0 ? '-' : steps}</span>
   </TagWrapper>
)

export default __TagSteps