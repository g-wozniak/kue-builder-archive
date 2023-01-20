import * as React from 'react'

type Props = {
   label: string
   properties: {
      key: string
      value: string
   }[]
}

const Property = ({label, properties}: Props) => {
   return (
      <section className="--kue-b-property">
         <span className="--label">{label}</span>
         {
            properties.map((p, i) => (
               <div key={`${p.key}_${i}`}>
                  <span className="--key">{p.key}</span>
                  <span className="--value">{p.value}</span>
               </div>
            ))
         }
      </section>
   )
}

export default Property
