/** @jsxImportSource @emotion/react */
import * as React from 'react'
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
} from '@solera/ui'
import {ReturnLink} from 'components'

export default function ApplicantDetails() {
  return (
    <div>
      <h1>Applicant Details</h1>
      <ReturnLink to="/applicants" variant="secondary">
        Applicant List
      </ReturnLink>
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
        <Tab>Applicant information</Tab>
        <Tab>Notes</Tab>
        <Tab>Communication history</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p css={{margin: 0}}>Applicant Information</p>
        </TabPanel>
        <TabPanel>
          <p css={{margin: 0}}>Notes</p>
        </TabPanel>
        <TabPanel>
          <p css={{margin: 0}}>Communication History</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
