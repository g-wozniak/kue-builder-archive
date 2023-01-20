import * as React from 'react'
import ProgressbarVersion from './progressbar_version'
import ProgressbarButtons from './progressbar_buttons'
import ProgressbarStats from './progressbar_stats'

import {ProgressbarProps} from '@intf/Progressbar'
import {getActiveRevisionStorageItem, getActiveTemplateActiveRevision, getActiveTemplateItem} from '@state/selectors'

const Progressbar = ({state, events}: ProgressbarProps) => {
   const activeTemplate = state.activeTemplate
   const template = getActiveTemplateItem(state)

   if (!template || !activeTemplate) {
      return <div/>
   }
   const version = template.version
   const templateRevision = getActiveTemplateActiveRevision(state)
   const storageRevision = getActiveRevisionStorageItem(state) // ?!

   return (
      <div className="--kue-b-progressbar">
         <div className="--kue-b-progressbar-header">
            <ProgressbarVersion templateRevision={templateRevision} version={version} state={state} />
            <ProgressbarButtons templateRevision={templateRevision} version={version} state={state} events={events} />
         </div>
         <div className="--kue-b-progressbar-footer">
            <ProgressbarStats templateRevision={templateRevision} storageRevision={storageRevision} version={version} />
         </div>
      </div>
   )
}

export default Progressbar
