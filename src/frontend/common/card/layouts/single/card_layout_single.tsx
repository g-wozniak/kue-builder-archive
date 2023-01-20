import * as React from 'react'
import CardLayoutWrapper from '../_layout/card_layout'
import {ReactNode} from 'react'

type Props = {
   slots: ReactNode[]
}

const CardLayoutSingle = ({slots}: Props) => {

   return (
      <CardLayoutWrapper decoratorClassName="layout-single">
         {slots[0]}
         {slots[1]}
         {slots[2]}
      </CardLayoutWrapper>
   )
}


export default CardLayoutSingle
