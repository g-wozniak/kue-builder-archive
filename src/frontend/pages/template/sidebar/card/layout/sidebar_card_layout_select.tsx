import * as React from 'react'
import {useMemo} from 'react'
import {DropdownItemProps} from 'semantic-ui-react'
import {common_CardLayouts, Utils} from '@kue-space/common'
import UI from '@frontend/ui/ui'

import config from '@root/config'


type Props = {
   layout: string
   onCardLayoutDropdownChange(layout: common_CardLayouts): void
}

const SidebarTemplateCardLayoutSelect = ({layout, onCardLayoutDropdownChange}: Props) => {

   const options: DropdownItemProps[] = useMemo(() => Utils.enumToValues(common_CardLayouts).map(slug => {
      const layout = config.cards.layouts[slug]
      return {
         key: `layout_${slug.toLowerCase()}`,
         value: slug,
         query: layout.caption,
         text: (
            <UI.Input.RichDropdownOption
               label={layout.caption}
               description={layout.description}
               icon={layout.icon}
            />
         )
      }
   }), [])

   return (
      <div className="--layout-selection-dropdown">
         <UI.Input.RichDropdown
            name="layout-select"
            disabled={false}
            onChange={(name, value) => onCardLayoutDropdownChange(value ? (value.toString() as any) : common_CardLayouts.None)}
            placeholder="Select the card layout"
            value={layout}
            noSearch={true}
            options={options}/>
      </div>
   )
}

export default SidebarTemplateCardLayoutSelect
