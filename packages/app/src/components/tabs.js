import { Tab, Tabs as TabsBase, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'

import { theme } from '@/theme'

export const Tabs = styled(TabsBase)`
  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }

  .react-tabs__tab-list {
    border-bottom: 1px solid ${props => props.theme.borderColor};
    margin: 0 0 ${theme.space[3]};
    padding: 0;
  }

  .react-tabs__tab {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
  }

  .react-tabs__tab--selected {
    border-bottom: 2px solid ${props => props.theme.color};
    color: ${props => props.theme.color};
    outline: 0;
  }

  .react-tabs__tab-panel {
    display: none;
    min-height: 130px;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }
`
export { Tab, TabList, TabPanel }
