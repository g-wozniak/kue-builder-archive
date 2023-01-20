import {when} from './__support__/when'
import {then} from './__support__/then'
import {reload} from './__support__/utils'

describe ('revision', () => {

    it('clicking the template version, selects the block', () => {
        reload()
        when('click', 'template version icon')
        then('template version panel', 'should be open')
    })

    it('clicking the template version, hides its content', () => {
        when('click', 'template version')
        then('template change settings', 'should be visible')
    })

    it('clicking on the save button, added new block', () => {
        reload()
        when('click', 'save button')
        then('block', 'should be add')
    })

    it('clicking the save as new button open popup', () => {
        when('click', 'save as new button')
        then('popup', 'should be open')
        then('save button', 'should be visible')
        then('save as new button', 'should be visible')
    })

    it('clicking the save as new button, added the new template version', () => {
        when('click', 'save us new button')
        then('new template version', 'should be visible')
    })

    it('clicking undo all button, undoes the entered block', () => {
        when('click', 'undo all button')
        then('entered block', 'should not be visible')
    })
    it('clicking delete button, template version is remove', () => {
        when('click','delete button')
        then('template version', 'should not be visible')
    })
})