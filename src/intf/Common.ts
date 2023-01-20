import {BlockDataProps, common_WantToBeRevisionID} from '@kue-space/common'
import {Node} from 'react-flow-renderer'

export type InputHeight = 'small' | 'large'

export type InputAccordionInputTypes = 'textarea' | 'textbox' | 'rich_textbox' | 'dropdown_time' | 'dropdown'

export type FormInputValues = string | number | undefined

export type AsyncProcessLifecycle = 'idle' | 'triggered' | 'completed' | 'failed'


// Revisions in Builder
export type Revisions = {
   published: common_WantToBeRevisionID
   current: common_WantToBeRevisionID
   base: common_WantToBeRevisionID
}

export type AmendableBlockDataProps = Partial<BlockDataProps>

export type onFormInputChange = (name: string, value: FormInputValues) => void

export type SelectedBlock = Node<BlockDataProps>