import * as React from 'react'
import {Dimmer as SemanticDimmer} from 'semantic-ui-react'
import {onSemanticInputEvent} from '@kue-space/common'

type Props = {
   onClick?: onSemanticInputEvent
   active: boolean
}

const Dimmer = ({onClick, active}: Props): JSX.Element => {
   return (
      <SemanticDimmer
         className="--kue-b-dimmer"
         active={active}
         onClick={onClick}
         inverted={false}>
      </SemanticDimmer>
   )
}

export default Dimmer
