import * as React from 'react'
import {useMemo} from 'react'
import {PopupProps, Popup as SemanticPopup} from 'semantic-ui-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCommentQuestion} from '@fortawesome/pro-light-svg-icons/faCommentQuestion'

type Props = Partial<PopupProps> & {
   help?: boolean
}

const Popup = (props: Props): JSX.Element => {
   const _props = {...props}
   if (_props.help) {
      _props.trigger = useMemo(() => <FontAwesomeIcon icon={faCommentQuestion} />, [])
   }

   return (
      <SemanticPopup
         className="--kue-b-popup"
         inverted={true}
         {..._props}
      />
   )
}

export default Popup
