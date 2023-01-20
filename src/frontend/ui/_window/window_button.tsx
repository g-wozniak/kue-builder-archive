import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   children: ReactNode
}

const WindowButton = ({children}: Props) => {
   return (
      <div className="--button">
         <div className="--inner">
            {children}
         </div>
      </div>
   )
}

export default WindowButton
