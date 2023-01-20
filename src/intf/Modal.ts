import {Node} from 'react-flow-renderer'
import {CardWidget, CardWidgetProps, common_RevisionID, TPayloads} from '@kue-space/common'

export interface ModalEvents {
   newCard: ModalNewCardEvents
   newCardWidget: ModalNewCardWidgetEvents
   viewCardWidget: ModalViewCardWidgetEvents
   templatePublish: ModalTemplatePublishEvents
}

export type ModalNewCardWidgetProps = {
   slot: number
}

export type ModalViewCardWidgetProps = {
   widget: CardWidget<any>
}

export type ModalTemplatePublishProps = {
   templateId: string
   revision: common_RevisionID
}

export type ModalNewCardEvents = {
   onNewCardPaneClick(parentBlock: Node, newBlockType: string): void
   onCloseContext(): void
}

export type ModalNewCardWidgetEvents = {
   onAddCardWidgetButtonClick(slot: number, widget: any): void
   onCloseContext(): void
}

export type ModalViewCardWidgetEvents = {
   onUpdateCardWidgetButtonClick(id: string, widgetProps: CardWidgetProps): void
   onDeleteCardWidgetButtonClick(id: string): void
   onCloseContext(): void
}

export type ModalTemplatePublishEvents = {
   onPublishButtonClick(templateId: string, revision: common_RevisionID, comment: string): void
   onCloseContext(): void
}

