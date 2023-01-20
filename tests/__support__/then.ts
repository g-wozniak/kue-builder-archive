import {elements, Elements} from './selectors'

const then = (element: Elements, should: string) => {
   if (!Object.hasOwn(elements, element)) {
      throw new Error(`Element ${element} is not found in the selectors`)
   }
   if (!Object.hasOwn(elements[element], '_')) {
      throw new Error(`Element ${element} has no default selector (_)`)
   }
   const query = elements[element]._

   if (should.indexOf('be') !== -1) {
      const modifier = should.split(' be ' )[1]

      if (modifier !== 'hidden') {
         let selector = query
         if (Object.hasOwn(elements[element], modifier)) {
            selector = query + elements[element][modifier]
         } else {
            console.warn(`Element ${element} is missing a "${modifier}" modifier.`)
         }
         // @ts-ignore
         cy.get(selector).should('be.visible')
      } else {
         // @ts-ignore
         cy.get(query).should('not.be.visible')
      }
   }
   else if (should.indexOf('have text') !== -1) {
      let text = should.split(' have text ')[1]
      text = text.replaceAll('"', '')
      // @ts-ignore
      cy.get(query).should('have.text', text)
   }

}

export {then}