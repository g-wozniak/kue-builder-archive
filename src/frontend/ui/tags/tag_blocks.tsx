import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSitemap} from '@fortawesome/pro-light-svg-icons/faSitemap'

import TagWrapper from './_tag/tag'

type Props = {
   blocks: number
}

const __TagBlocks = ({blocks}: Props): JSX.Element => (
   <TagWrapper classDecorator={`--blocks ${blocks ===  0 ? '--disabled' : ''}`}>
      <FontAwesomeIcon icon={faSitemap} />
      <span>{blocks === 0 ? '-' : blocks}</span>
   </TagWrapper>
)

export default __TagBlocks