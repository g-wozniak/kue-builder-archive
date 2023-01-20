import {useMemo} from 'react'
import * as React from 'react'
import {common_CardTypes, Utils} from '@kue-space/common'
import {faArrowRightToLine} from '@fortawesome/pro-light-svg-icons/faArrowRightToLine'
import {faCloudArrowUp} from '@fortawesome/pro-light-svg-icons/faCloudArrowUp'
import {faClock} from '@fortawesome/pro-light-svg-icons/faClock'
import {faCardsBlank} from '@fortawesome/pro-light-svg-icons/faCardsBlank'
import countBy from 'lodash/countBy'
import {ProgressbarStats} from '@intf/Progressbar'

import config from '@root/config'
import UI from '@frontend/ui/ui'

const ProgressbarStats = ({templateRevision, storageRevision, version}: ProgressbarStats) => {
   const totalBlocks = useMemo(() => templateRevision ? templateRevision.nodes.toString() : '-', [templateRevision])
   const totalCards = useMemo(() => countBy(storageRevision?.nodes, (node) => node.type), [storageRevision])

   return (
      <div className="--kue-b-progressbar-stats">
         <div className="--time-log">
            <UI.Tag.Plate icons={[faClock, faCloudArrowUp]} text={version.published ? Utils.isoToDateTime(version.published, false) : '--'}/>
            <UI.Tag.Plate icons={[faClock, faArrowRightToLine]} text={templateRevision ? Utils.timestampToDateTime(templateRevision.timestamp, false) : '--'}/>
         </div>
         <div className="--block-stats">
            <UI.Tag.Plate icons={[faCardsBlank]} text={totalBlocks}/>
            {
               storageRevision && Utils.enumToValues(common_CardTypes).map((type, i) => {
                  const totalCardsForType = totalCards.hasOwnProperty(type) ? totalCards[type].toString() : '0'
                  return (
                     <UI.Tag.PlateBlock
                        key={`plate_stat_${i}`}
                        decoratorClass={`--block-${type}`}
                        icon={config.blocks[type].icon}
                        text={totalCardsForType}
                     />
                  )
               })
            }
         </div>
      </div>
   )
}

export default ProgressbarStats
