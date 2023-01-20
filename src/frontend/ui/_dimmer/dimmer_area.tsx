import * as React from 'react'
import {Dimmer, Loader} from 'semantic-ui-react'
import {ReactNode} from 'react'

type Props = {
   children: ReactNode
   inverted: boolean
   active: boolean
   content?: {
      header: string
      subheader: string
   }
}

const DimmerArea = ({children, inverted, active, content}: Props): JSX.Element => {
   return (
      <Dimmer.Dimmable
         className="--kue-b-dimmer"
         dimmed={active}>
         {children}
         <Dimmer active={active} inverted={inverted}>
            {content
               ? (
                  <div className="--loader">
                     <Loader size="huge" active={true} />
                     <div className="--loader-info">
                        <span className="--header">{content.header}</span>
                        <span className="--subheader">{content.subheader}</span>
                     </div>
                  </div>
               )
               : <Loader active={active}/>
            }
         </Dimmer>
      </Dimmer.Dimmable>
   )
}

export default DimmerArea
