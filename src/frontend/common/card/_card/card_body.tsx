import React, {PropsWithChildren} from 'react'

const CardBody = ({children}: PropsWithChildren): JSX.Element => (
   <div className="--kue-bb-body">
      {children}
   </div>
)

export default CardBody
