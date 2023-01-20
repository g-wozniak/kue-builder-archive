export type Elements = keyof typeof elements

export const elements = {
   'builder pane': {
      _: '.react-flow__pane'
   },
   'goal block': {
      _: '#builder-block--goal',
      selected: '.--selected',
      deselected: ':not(.--selected)'
   },
   'browse sidebar': {
      _: '#builder-panel-browse'
   },
   'browse sidebar -> block properties section': {
      _: '#builder-panel-block'
   },
   'browse sidebar -> block properties section -> block name': {
      _: '#builder-panel-block .--vw-bs-browse-block-summary .--name'
   },
   'browse sidebar -> block tree section': {
      _: '#builder-panel-tree'
   },
   'browse sidebar -> block tree section -> selected item': {
      _: '#builder-panel-tree .text .--block-label'
   },
   'browse toolbar icon': {
      _: '#builder-toolbar-button--browse',
      active: '.active'
   },
   'template settings icon': {
      _: '#builder-toolbar-button--settings'
   },
   'template settings panel': {
      _: '#builder-panel-template'
   },
   'template name undo button': {
      _: '#',
      active: '.active',
      deactivate: 'not(.--active)'
   },
   'template name label': {
      _: '#builder-form-name-set label'
   },
   'template name description': {
      _: '#builder-form-name-set .--description'
   },
   'template name input': {
      _: '#builder-form-input-name'
   }
}