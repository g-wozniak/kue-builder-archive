import * as React from 'react'
import {PropsWithChildren} from 'react'

type Props = PropsWithChildren & {
   decoratorClassName: string
}

const CardLayoutWrapper = (props: Props) => {
   return (
      <section className={`--kue-b-card-layout --${props.decoratorClassName}`}>
         {props.children}
      </section>
   )
}


export default CardLayoutWrapper
