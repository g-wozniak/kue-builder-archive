import React, {useState} from 'react'
import UI from '@frontend/ui/ui'

type Props = {
   onFormClose(): void
   onSaveAsNewButtonClick(label: string, comment: string): void
}

const SidebarTemplatesItemSaveAsNewForm = ({onSaveAsNewButtonClick, onFormClose}: Props) => {

   const [label, setLabel] = useState('')
   const [comment, setComment] = useState('')

   return (
      <UI.Form
         name="revision-save-as-new-form"
         bordered={false}
         inverted={true}
         buttons={[
            <UI.Button.Classic
               id="form-button--close"
               key="form-save-as-bt-1"
               disabled={false}
               small={true}
               role="cancel"
               caption="Cancel"
               onClick={onFormClose}
            />,
            <UI.Button.Classic
               id="form-button--revision-save"
               key="form-save-as-bt-2"
               caption="Save as new"
               small={true}
               disabled={label.length === 0}
               onClick={() => {
                  onSaveAsNewButtonClick(label, comment)
                  setLabel('')
                  setComment('')
               }}
            />
      ]}>
         <UI.Input.RichTextbox
            name="label"
            placeholder="Revision title..."
            value={label}
            icon="pencil"
            onChange={(name, value) => setLabel(value as string)}
         />
         <UI.Input.Textarea
            name="comment"
            placeholder="Revision description..."
            value={comment}
            onChange={(name, value) => setComment(value as string)}
         />
      </UI.Form>
   )
}

export default SidebarTemplatesItemSaveAsNewForm


