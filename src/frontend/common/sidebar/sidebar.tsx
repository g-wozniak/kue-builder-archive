import * as React from 'react'
import {PropsWithChildren} from 'react'
import {Widgets} from '@root/properties'

type Props = PropsWithChildren & {
   page: Widgets
}

const classDecorators = {
   [Widgets.TemplateBrowsePage]: '--template',
   [Widgets.TemplatesListPage]: '--templates',
   [Widgets.TemplateSettingsPage]: '--settings'
}

const Sidebar = ({page, children}: Props) => {
   const cssClasses = ['--kue-bs', classDecorators[page]]
   return (
      <section className={cssClasses.join(' ')}>
         {children}
      </section>
   )
}

export default Sidebar