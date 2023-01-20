import * as React from 'react'
import {createRoot} from 'react-dom/client'

import './styles/local.scss'
import MockedApiBuilderAdapter from '@root/adapters/mock'
import ApiBuilderAdapter from '@root/adapters/api'

const root = createRoot(document.getElementById('my-kue') as HTMLElement)
// root.render(<MockedApiBuilderAdapter/>)
root.render(<ApiBuilderAdapter/>)
