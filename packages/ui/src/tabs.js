/** @jsx jsx */
import styled from '@emotion/styled/macro'
import * as colors from './styles/colors'
import {
  Tabs,
  TabList as ReachTabList,
  Tab as ReachTab,
  TabPanels as ReachTabPanels,
  TabPanel
} from '@reach/tabs'
import '@reach/tabs/styles.css'

const TabList = styled(ReachTabList)({
  background: 'transparent',
  borderBottom: `5px solid ${colors.gray40}`
})

const Tab = styled(ReachTab)({
  background: colors.gray,
  padding: '1.5rem 2rem',
  paddingBottom: 'calc(2rem - 5px)',
  marginRight: '10px',
  fontWeight: 500,
  fontSize: '20px',
  color: colors.secondary,
  minWidth: '200px',
  position: 'relative',
  border: `5px solid ${colors.gray}`,
  borderBottom: 'none',
  '&[aria-selected=true]': {
    color: colors.text,
    background: colors.base,
    border: `5px solid ${colors.gray40}`,
    borderBottom: 'none'
  },
  '&[aria-selected=true]:after': {
    content: '""',
    border: `5px solid ${colors.base}`,
    position: 'absolute',
    bottom: -5,
    left: 0,
    width: '100%'
  }
})

const TabPanels = styled(ReachTabPanels)({
  border: `5px solid ${colors.gray40}`,
  borderTop: 'none',
  padding: '2rem'
})

export { Tabs, TabList, Tab, TabPanels, TabPanel }
