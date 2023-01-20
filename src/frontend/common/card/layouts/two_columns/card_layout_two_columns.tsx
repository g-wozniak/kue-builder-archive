import * as React from 'react'
import {ReactNode} from 'react'
import CardLayoutWrapper from '../_layout/card_layout'

type Props = {
   slots: ReactNode[]
   equal?: boolean
}

const CardLayoutTwoColumns = ({slots, equal}: Props) => {

   return (
      <CardLayoutWrapper decoratorClassName={`layout-two-columns${equal ? '-equal' : ''}`}>
         <div className="--row-1">
            {slots[0]}
         </div>
         <div className="--row-2">
            {slots[1]}
            {slots[2]}
         </div>
      </CardLayoutWrapper>
   )
}


export default CardLayoutTwoColumns
