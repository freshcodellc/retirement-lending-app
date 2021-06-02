/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
  Select,
  SelectOption,
  colors,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TextLink,
} from '@solera/ui'
import {FiArrowLeft} from 'react-icons/fi'

export default function ApplicantDetails() {
  return (
    <div>
      <h1>Applicant Details</h1>
      <Link
        to="/applicants"
        css={{
          fontSize: '1.1rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <FiArrowLeft color={colors.secondary} css={{marginRight: '4px'}} />
        <TextLink variant="secondary">Applicant List</TextLink>
      </Link>
      <ActionsPanel />
      <DetailsTabs />
    </div>
  )
}

function ActionsPanel() {
  return (
    <div
      css={{
        padding: '2rem',
        marginBottom: '2rem',
        border: `5px solid ${colors.gray40}`,
        display: 'flex',
        flexWrap: 'wrap',
        // alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '2rem',
        '&>div': {
          maxWidth: '300px',
          minWidth: '200px',
          width: '100%',
        },
      }}
    >
      <div>
        <Select
          label="Status"
          id="status"
          name="status"
          css={{marginBottom: '2rem'}}
        >
          <SelectOption value="status1">status 1</SelectOption>
          <SelectOption value="status2">status 2</SelectOption>
        </Select>
        <Select label="Assigned to" id="assigned-to" name="assigned-to">
          <SelectOption value="status1">status 1</SelectOption>
          <SelectOption value="status2">status 2</SelectOption>
        </Select>
      </div>
      <div>
        <Button variant="secondary">Send terms sheet</Button>
      </div>
    </div>
  )
}

function DetailsTabs() {
  return (
    <Tabs>
      <TabList>
        <Tab>Applicant Information</Tab>
        <Tab>Notes</Tab>
        <Tab>Communication History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p css={{margin: 0}}>Click the tabs or pull the slider around</p>
        </TabPanel>
        <TabPanel>
          <p>Yeah yeah. What's up?</p>
        </TabPanel>
        <TabPanel>
          <p>Oh, hello there.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
