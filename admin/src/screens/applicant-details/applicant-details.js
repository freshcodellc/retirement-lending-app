/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useParams} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import {ActionsPanel} from './actions-panel'
import {ApplicationInfo} from './application-info'
import {NotesTab} from './tabs/notes'
import {CommunicationHistoryTab} from './tabs/communication-history'
import {ChangeHistoryTab} from './tabs/change-history'
import {WorksheetFieldsTab} from './tabs/worksheet-tab'

import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@solera/ui'
import {useApplication} from 'hooks/use-application'
import {useChangeHistories} from 'hooks/use-change-histories'

import {ReturnLink} from 'components'

export default function ApplicantDetails() {
  const {uuid} = useParams()
  const {application, isLoading, isError, error} = useApplication()
  const {changeHistories} = useChangeHistories(uuid)
  const [activeTab, setActiveTab] = React.useState(0)

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <div>
      <h1>Applicant Details</h1>
      <ReturnLink to="/applicants" variant="secondary">
        Applicant List
      </ReturnLink>
      <ActionsPanel activeTab={activeTab} application={application} />
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>Applicant information</Tab>
          <Tab>Notes</Tab>
          <Tab>Communication history</Tab>
          <Tab>Change history</Tab>
          <Tab>Non-Recourse Worksheet Fields</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ApplicationInfo application={application} />
          </TabPanel>
          <TabPanel>
            <NotesTab application={application} />
          </TabPanel>
          <TabPanel>
            <CommunicationHistoryTab application={application} />
          </TabPanel>
          <TabPanel>
            <ChangeHistoryTab changeHistories={changeHistories} />
          </TabPanel>
          <TabPanel>
            <WorksheetFieldsTab application={application} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Toaster />
    </div>
  )
}
