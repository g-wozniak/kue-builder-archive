import {common_CardLayouts, common_CardTypes, common_Difficulties, Configs, Utils} from '@kue-space/common'
import {faBan} from '@fortawesome/pro-light-svg-icons/faBan'
import {faRectangle} from '@fortawesome/pro-light-svg-icons/faRectangle'
import {faTableColumns} from '@fortawesome/pro-light-svg-icons/faTableColumns'
import {faTableLayout} from '@fortawesome/pro-light-svg-icons/faTableLayout'
import {faTableRows} from '@fortawesome/pro-light-svg-icons/faTableRows'

import {Config} from '@intf/Config'

const config: Config = {
   goal: {
      id: 'goal',
      widget: 'Describe your pathway goal. Whilst `Become the superman!` appears on the card, this goal will be displayed upon exploring the main card content.',
      initialPositionX: -100, // necessary to calculate the right position on the diagram
      blockWidth: 100, // =||=
      blockHeight: 50 // =||=
   },
   firstChange: {
      label: 'The template first change',
      comment: 'adding the goal block'
   },
   limits: {
      templates: 3,
      revisions: 3
   },
   blockOffset: {
      x: 200,
      y: 100
   },
   blocks: {
      [common_CardTypes.Goal]: {
         ...Configs.cards[common_CardTypes.Goal],
         className: '--kue-bb--goal',
         hiddenDetails: ['difficulty', 'time', 'cost']
      },
      [common_CardTypes.Category]: {
         ...Configs.cards[common_CardTypes.Category],
         className: '--kue-bb--category',
         hiddenDetails: ['difficulty', 'time', 'cost']
      },
      [common_CardTypes.Skill]: {
         ...Configs.cards[common_CardTypes.Skill],
         className: '--kue-bb--skill',
         hiddenDetails: []
      },
      [common_CardTypes.Task]: {
         ...Configs.cards[common_CardTypes.Task],
         className: '--kue-bb--task',
         hiddenDetails: []
      }
   },
   cards: {
      details: {
         label: {
            label: 'Card name',
            description: 'Label displayed on the card preview',
            inputType: 'textbox'
         },
         description: {
            label: 'Description',
            description: 'Description displayed on the card preview',
            inputType: 'textarea'
         },
         customCardType: {
            label: 'Custom group',
            description: 'Set an optional custom card group name',
            inputType: 'textbox'
         },
         time: {
            label: 'Time to complete',
            description: 'How much time is necessary to explore the content of this card?',
            inputType: 'dropdown_time',
            placeholder: 'Choose the timeframe'
            // min: 1,
            // max: 20 * 7 * 60
         },
         difficulty: {
            label: 'Difficulty',
            description: 'How difficult is the content?',
            inputType: 'dropdown',
            placeholder: 'Select difficulty',
            options: Utils.enumToSemanticUIOptions('difficulty', common_Difficulties, {
               [common_Difficulties.None]: 'trivial',
               [common_Difficulties.VeryEasy]: 'very easy',
               [common_Difficulties.Easy]: 'easy',
               [common_Difficulties.Moderate]: 'moderate',
               [common_Difficulties.Hard]: 'challenging',
               [common_Difficulties.VeryHard]: 'difficult',
               [common_Difficulties.MindBlowing]: 'extreme'
            })
         },
         cost: {
            label: 'Cost',
            description: 'How expensive is the content purchase?',
            inputType: 'rich_textbox',
            inputLabel: 'USD ($)'
         }
      },
      layouts: {
         [common_CardLayouts.None]: {
            caption: 'No layout',
            description: 'No card content shall be displayed',
            icon: faBan
         },
         [common_CardLayouts.Single]: {
            caption: 'Single column',
            description: 'Each widget takes full page width',
            icon: faRectangle
         },
         [common_CardLayouts.TwoColumns]: {
            caption: 'Two columns',
            description: 'Left column is shorter than right and full-width widget at the top',
            icon: faTableLayout
         },
         [common_CardLayouts.TwoEqualColumns]: {
            caption: 'Two equal columns',
            description: 'Both columns of equal width and full-width widget at the top',
            icon: faTableColumns
         },
         [common_CardLayouts.TwoRows]: {
            caption: 'Two rows',
            description: 'Small left column next to the two wide rows',
            icon: faTableRows
         }
      },
      widgetsInCard: 3,
      widgets: Configs.widgets
   }
}

export default config
