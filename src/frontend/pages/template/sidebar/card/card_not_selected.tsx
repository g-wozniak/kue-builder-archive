import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBlockQuestion} from '@fortawesome/pro-light-svg-icons/faBlockQuestion'

const SidebarTemplateCardNotSelected = () => {
   return (
      <div className="--not-selected">
         <FontAwesomeIcon icon={faBlockQuestion}/>
         <span className="--header">Card not selected</span>
         <span className="--info">Click on the card to explore and design it.</span>
      </div>
   )
}

export default SidebarTemplateCardNotSelected
