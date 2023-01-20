import * as React from 'react'

type Props = {
   classDecorator: string
   children: React.ReactNode
}

const TagWrapper = ({classDecorator, children}: Props): JSX.Element => (
   <div className={`--kue-b-tag ${classDecorator}`}>
      <div>
         {children}
      </div>
   </div>
)

export default TagWrapper