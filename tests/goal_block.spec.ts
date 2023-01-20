import {andFinally, when} from './__support__/when'
import {then} from './__support__/then'
import {reload} from './__support__/utils'


describe('→ goal block', () => {

   it('→ clicking the goal block, selects the block', () => {
      reload()
      when('click', 'goal block')
      then('goal block', 'should be selected')
   })

   it('→ clicking on the pane deselects the block', () => {
      reload()
      when('click', 'builder pane')
      then('goal block', 'should be deselected')
   })

   it('→ clicking the goal block, enables `browse` sidebar', () => {
      when('click', 'goal block')
      then('browse sidebar', 'should be active')
      then('browse toolbar icon', 'should be active')
      then('browse sidebar -> block properties section', 'should be active')
      then('browse sidebar -> block properties section -> block name', 'should have text "Path Goal"')
      then('browse sidebar -> block tree section', 'should be active')
      then('browse sidebar -> block tree section -> selected item', 'should have text "Path goal"')
      andFinally('click', 'builder pane', 'to deselect the block')
   })

})