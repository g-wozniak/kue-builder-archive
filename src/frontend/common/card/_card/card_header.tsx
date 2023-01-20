import React from 'react'
import CardIcon from '../card_icon'
type Props = {
   title: string
   icon: string
}

const CardHeader = ({title, icon}: Props): JSX.Element => {
   return (
      <div className="--kue-bb-header">
         <span className="--icon">
            <CardIcon icon={icon} height={42} alt={title}/>
         </span>
         <span className="--title">{title}</span>
      </div>
   )
}

export default CardHeader
