import * as React from 'react'
import __Window from './_window/window'
import __Form from './_form/form'
import __Popup from './popup/popup'
import __Property from './property/property'
import __Dimmer from './_dimmer/dimmer'
import __DimmerArea from './_dimmer/dimmer_area'
import __Input from './inputs/input'
import __Button from './buttons/button'
import __Tag from './tags/tag'
import __KueLogo from './logo/logo'

const UI = () => {
   return <div />
}

UI.Window = __Window
UI.Dimmer = __Dimmer
UI.Form = __Form
UI.DimmerArea = __DimmerArea
UI.Property = __Property
UI.Popup = __Popup
UI.KueLogo = __KueLogo
UI.Button = __Button
UI.Tag = __Tag
UI.Input = __Input

export default UI