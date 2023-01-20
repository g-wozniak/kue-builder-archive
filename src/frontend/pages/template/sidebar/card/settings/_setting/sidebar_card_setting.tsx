import * as React from 'react'
import {PropsWithChildren} from 'react'

type Props = PropsWithChildren & {
   label: string
   decoratorClass: string
}

const SidebarCardSettingWrapper = ({label, decoratorClass, children}: Props): JSX.Element => {
   return (
      <section className={`--kue-bs-template-block-settings-property --${decoratorClass}`}>
         <span className="--label">{label}</span>
         {children}
      </section>
   )
}

export default SidebarCardSettingWrapper
