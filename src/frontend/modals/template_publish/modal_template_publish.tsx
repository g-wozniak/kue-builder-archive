import React from 'react'
import {faCloudArrowUp} from '@fortawesome/pro-light-svg-icons/faCloudArrowUp'
import {RootState} from '@intf/State'
import {ModalTemplatePublishEvents, ModalTemplatePublishProps, ModalViewCardWidgetProps} from '@intf/Modal'

import {WidgetGroups, Widgets} from '@root/properties'
import {
   getActiveRevisions, getTemplateItem,
   getWidgetProps,
   isActiveTemplateSaved,
   isWidgetActive,
   isWidgetGroupBusy
} from '@state/selectors'
import ModalWrapper from '../_modal/modal'
import ModalTemplatePublishForm from './modal_template_publish_form'


type Props = {
   state: RootState
   events: ModalTemplatePublishEvents
}

//  It will overwrite the existing version and suggest there is an improvement made to the template pathway.
// 'By publishing it, you are about to make it accessible to other users.'

const ModalTemplatePublish = ({state, events}: Props): JSX.Element => {
   const isModalActive = isWidgetActive(state, Widgets.TemplatePublishModal)
   const allSaved = isActiveTemplateSaved(state)
   const {base} = getActiveRevisions(state)
   const props = getWidgetProps(state, Widgets.TemplatePublishModal) as ModalTemplatePublishProps

   if (props && props.templateId && isModalActive && base) {
      const template = getTemplateItem(state, props.templateId)!
      return (
         <ModalWrapper
            name="template-publishing"
            caption="Publish new version"
            icon={faCloudArrowUp}
            busy={isWidgetGroupBusy(state, WidgetGroups.Modals)}
            onClose={events.onCloseContext}
         >
            <section>
               <span className="--text">You are about to release a new version of your template and make it accessible by the learners.</span>
               <ModalTemplatePublishForm
                  templateId={template._id}
                  version={template.version.major}
                  revision={base}
                  allSaved={allSaved}
                  onPublishButtonClick={events.onPublishButtonClick}/>
            </section>
         </ModalWrapper>
      )
   }

   return <></>



}



export default ModalTemplatePublish
