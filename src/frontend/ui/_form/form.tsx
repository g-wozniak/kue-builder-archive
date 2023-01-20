import * as React from 'react'

type Props = {
   name: string
   bordered?: boolean
   inverted?: boolean
   buttons: React.ReactNode
   children: React.ReactNode
}

const Form = ({name, bordered, inverted, buttons, children}: Props) => {
   const cssClasses = ['--kue-form']

   if (bordered) {
      cssClasses.push('--form-bordered')
   }

   if (inverted) {
      cssClasses.push('--form-inverted')
   }

   return (
      <div id={`builder-form-${name}`} className={cssClasses.join(' ')}>
         <main className="--kue-form-body">
            {children}
         </main>
         <footer className="--kue-form-footer">
            {buttons}
         </footer>
      </div>
   )
}

export default Form
