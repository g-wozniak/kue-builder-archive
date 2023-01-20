import * as React from 'react'
import {ReactNode} from 'react'
import {CardWidget} from '@kue-space/common'

type Props = {
   id: string
   widget: CardWidget<any>
   children: ReactNode
}

const CardWidgetWrapper = ({id, widget, children}: Props): JSX.Element => {
   const slug = widget.widget.toLowerCase().replaceAll('_','-')
   const classNames = ['--kue-b-card-widget', `--${slug}`]
   return (
      <section className={classNames.join(' ')} id={`modal-widget-${id}`}>
         {children}
      </section>
   )
}

export default CardWidgetWrapper
