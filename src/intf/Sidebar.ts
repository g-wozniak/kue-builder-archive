import {
   BlockDataProps, CardWidget, common_CardLayouts,
   common_RevisionID, TPayloads
} from '@kue-space/common'
import {Node, Edge} from 'react-flow-renderer/nocss'
import {AmendableBlockDataProps, onFormInputChange, SelectedBlock} from '@intf/Common'
import {RootState} from '@intf/State'


/**
 * SidebarEvents
 * @description (type) list of all events which can be triggered inside the sidebar
 */

export type SidebarEvents = {
   templates: SidebarTemplatesEvents
   template: SidebarTemplateEvents
   settings: SidebarSettingsEvents
}

export type SidebarTemplatesEvents = {
   onSelectRevisionBoxClick(templateId: string, revision: common_RevisionID): void
   onLoadButtonClick(): void
   onAddButtonClick(): void
   onSaveAsNewButtonClick(label: string, comment?: string): void
   onSaveAsNewFormCloseButtonClick(): void
   onDeleteRevisionButtonClick(templateId: string, revision: common_RevisionID): void
   onPublishTemplateButtonClick(templateId: string, revision: common_RevisionID): void
}

export type SidebarTemplatesProps = {
   state: RootState
   events: SidebarTemplatesEvents
}

export type SidebarTemplateEvents = {
   onAddBlockButtonClick(): void
   onCardDetailsSubmitButtonClick(data: AmendableBlockDataProps): void
   onCardLayoutDropdownChange(layout: common_CardLayouts): void
   onCardLayoutEmptySlotButtonClick(slot: number): void
   onCardLayoutSlotButtonClick(widget: CardWidget<any>): void
   onCardSearchDropdownChange: onFormInputChange
   onCardSettingsDeleteButtonClick(cardId: string): void
   onCardSettingsChangeLinkButtonClick(selectedBlock: Node, sourceBlockId: string, existingEdgeIndex: number): void
}

export type SidebarSettingsEvents = {
   onTemplateInformationFormSubmit(payload: TPayloads.TTemplateAmendablePayload): void
}

export type SidebarTemplateBaseProps = {
   state: RootState
   events: SidebarTemplateEvents
   nodes: Node<BlockDataProps>[]
   edges: Edge[]
   selectedBlockNode: SelectedBlock | undefined
}

export type SidebarTemplateProps = SidebarTemplateBaseProps & {
   selectedBlockNode: SelectedBlock
}

export type SidebarSettingsProps = {
   state: RootState
   events: SidebarSettingsEvents
}