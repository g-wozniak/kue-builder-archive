import * as React from 'react'
import {useMemo, useState} from 'react'
import {TPayloads} from '@kue-space/common'
import {faGear} from '@fortawesome/pro-light-svg-icons/faGear'
import {SidebarSettingsProps} from '@intf/Sidebar'
import UI from '@frontend/ui/ui'
import isEqual from 'lodash/isEqual'
import {getActiveTemplateItem} from '@state/selectors'

type Props = SidebarSettingsProps

const SidebarSettings = ({state, events}: Props) => {
   const template = getActiveTemplateItem(state)!
   const initialTemplateInformation: TPayloads.TTemplateAmendablePayload = {
      name: template.name,
      slug: template.slug,
      headline: template.headline,
      description: template.description
   }
   const [inputs, setInputs] = useState({...initialTemplateInformation})

   const hasFormChanged = useMemo(() => !isEqual(template, inputs), [template, inputs])

   return (
      <UI.Window
         caption="Template settings"
         icon={faGear}>
         <section id="builder-sidebar-settings">
            <UI.Form
               name="template-information-form"
               buttons={
                  <UI.Button.Classic
                     id="button-settings--submit"
                     disabled={!hasFormChanged}
                     caption="Save changes"
                     onClick={() => events.onTemplateInformationFormSubmit(inputs)}/>
               }>
               <UI.Input.Accordion
                  name="name"
                  label="Template name"
                  description="Name of your pathway"
                  inputType="textarea"
                  value={inputs.name}
                  setInputs={setInputs}
               />
               <UI.Input.Accordion
                  name="slug"
                  label="Template slug"
                  description="Unique part of the URL used to preview your template details"
                  inputType="textbox"
                  value={inputs.slug}
                  setInputs={setInputs}
               />
               <UI.Input.Accordion
                  name="headline"
                  label="Template headline"
                  description="Summary of what your pathway is for"
                  inputType="textarea"
                  value={inputs.headline}
                  setInputs={setInputs}
               />
               <UI.Input.Accordion
                  name="description"
                  label="Pathway description"
                  description="Detailed description of learning outcomes and the pathway"
                  inputType="textarea"
                  height="large"
                  value={inputs.description}
                  setInputs={setInputs}
               />
            </UI.Form>
         </section>
      </UI.Window>
   )
}

export default SidebarSettings
