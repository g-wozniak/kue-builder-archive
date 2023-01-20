import * as React from 'react'

import TagWrapper from './_tag/tag'

type Props = {
   name: string | undefined
}

const __TagRevision = ({name}: Props): JSX.Element => (
   <TagWrapper classDecorator="--revision">
      <span>{name || ''}</span>
   </TagWrapper>
)

export default __TagRevision