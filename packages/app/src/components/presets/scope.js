import Microlink from '@microlink/react'
import styled from 'styled-components'
import * as polished from 'polished'

import { Fetch } from '../fetch'
import { Link } from '../link'
import { Lighthouse } from '../lighthouse'
import { MQL } from '../mql'
import { Script } from '../script'

import * as ThemeUI from 'theme-ui'

ThemeUI.Image.defaultProps = {
  alt: ''
}

const scope = {
  ...ThemeUI,
  Fetch,
  Link,
  Lighthouse,
  Microlink,
  MQL,
  Script,
  polished,
  styled
}

export default scope
