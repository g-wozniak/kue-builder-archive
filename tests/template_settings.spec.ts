import {when} from './__support__/when'
import {then} from './__support__/then'
import {reload} from './__support__/utils'

describe ('→ toolbar → template settings', () => {

   it('→ clicking the settings icon, opens the template settings panel', () => {
      reload()
      when('click', 'template settings icon')
      then('template settings panel', 'should be open')
   })

   it('→ clicking the settings icon, enables `browse` template settings', () => {
      reload()
      when('click', 'template settings icon')
      then('template name label', 'should be visible')
      then('template name description', 'should be visible')
      then('template name input', 'should be visible')
   })

   it('→ clicking the template name label, hides its content', () => {
      when('click', 'template name label')
      then('template name description', 'should be hidden')
      then('template name input', 'should be hidden')
      // then('accordion button','should change direction')
   })

   it('→ clicking the template name undo button, reverts the input to its original content', () => {
      reload()
      when('click', 'template name undo button')
      then('template name input', 'should be empty')
      then('template name undo button', 'should be inactive')
   })

   it('→ select template name input → write some text', () => {
      reload()
      when('select', 'template name input')
      then('template name undo button', 'should be active')

   })
})
