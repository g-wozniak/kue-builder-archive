import React from 'react'
import {Button} from 'semantic-ui-react'
import CardIcon from '@frontend/common/card/card_icon'


type Props = {
   caption: string
   description: string
   icon: string
   classDecorator?: string
   onClick(): void
}

const ButtonPane = ({caption, description, icon, classDecorator, onClick}: Props): JSX.Element => {
   return (
      <Button
         fluid={true}
         onClick={onClick}
         className={`--kue-b-button-pane ${classDecorator}`}
      >
         <span className="--header">
            <span className="--header-icon">
               <CardIcon icon={icon} height={28} alt={caption}/>
            </span>{caption}
         </span>
         <span className="--description">{description}</span>
      </Button>
   )
}

export default ButtonPane
