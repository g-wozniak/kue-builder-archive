import * as React from 'react'
import {ReactNode} from 'react'
import CardLayoutWrapper from '../_layout/card_layout'

type Props = {
   slots: ReactNode[]
}
const CardLayoutTwoRows = ({slots}: Props) => {

   return (
      <CardLayoutWrapper decoratorClassName="layout-two-rows">
         <div className="--column-1">
            {slots[0]}
         </div>
         <div className="--column-2">
            {slots[1]}
            {slots[2]}
         </div>
      </CardLayoutWrapper>
   )
}


export default CardLayoutTwoRows
