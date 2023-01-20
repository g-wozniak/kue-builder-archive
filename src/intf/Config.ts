import {DropdownItemProps} from 'semantic-ui-react'
import {CardConfig, CardWidgetConfig, common_CardLayouts} from '@kue-space/common'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {AmendableBlockDataProps, InputAccordionInputTypes} from '@intf/Common'


export type AmendableBlockDataPropsKeys = keyof Omit<AmendableBlockDataProps, 'widgets' | 'layout'>

export type BuilderBlockConfig = CardConfig & {
   className: string
   hiddenDetails: AmendableBlockDataPropsKeys[]
}

export type Config = {
   goal: {
      id: string
      widget: string
      initialPositionX: number
      blockWidth: number
      blockHeight: number
   },
   firstChange: {
      label: string
      comment: string
   },
   limits: {
      templates: number
      revisions: number
   }
   blockOffset: {
      x: number
      y: number
   }
   blocks: {
      [blockType: string]: BuilderBlockConfig
   }
   cards: {
      details: {
         [field in AmendableBlockDataPropsKeys]: {
            label: string
            description: string
            inputType: InputAccordionInputTypes
            inputLabel?: string
            options?: DropdownItemProps[]
            placeholder?: string
            // min?: number
            // max?: number
         }
      }
      layouts: {
         [layout in common_CardLayouts]: {
            caption: string
            description: string
            icon: IconDefinition
         }
      }
      widgetsInCard: number
      widgets: {
         [widget: string]: CardWidgetConfig<any>
      }
   }
}