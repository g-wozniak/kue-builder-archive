import * as React from 'react'
import {Handle, NodeProps, Position} from 'react-flow-renderer/nocss'
import {BlockDataProps} from '@kue-space/common'
import {BuilderBlockConfig} from '@intf/Config'

import config from '@root/config'
import CardHeader from './_card/card_header'
import CardBody from './_card/card_body'
import __CardWidgets from './widgets/card_widgets'

type Props = NodeProps<BlockDataProps> & BuilderBlockConfig

const Card = ({id, type, data, parentFor, className, selected}: Props) => {
   const isGoalBlock = id === config.goal.id
   const blockConfig = config.blocks[type]!

   const classNames = ['--kue-bb', className]
   if (selected) {
      classNames.push('--selected')
   }

   if (isGoalBlock) {
      classNames.push('--no-drag')
   }

   return (
      <>
         {!isGoalBlock && <Handle type="target" position={Position.Left}/>}
         {parentFor.length > 0 && <Handle type="source" position={Position.Right}/>}
         <section id={`builder-block--${id}`} className={classNames.join(' ')}>
            <div>
               <CardHeader title={data.label} icon={blockConfig.icon}/>
               <CardBody>
                  <span className="--text">{data.description}</span>
               </CardBody>
            </div>
         </section>
      </>
   )
}

Card.Widget = __CardWidgets

export default Card
