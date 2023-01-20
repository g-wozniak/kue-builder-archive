import {elements, Elements} from './selectors'

export type Actions =
   'click' | 'select'


const when = (action: Actions, on: Elements) => {
   // @ts-ignore
   const el = cy.get(elements[on]._)
   switch (action) {
      case 'click': {
         el.click({force: true})
         break
      }
   }
   }

const andFinally = (action: Actions, on: Elements, why: string) => {
   when(action, on)
   console.info(why)
}

export {when, andFinally}