import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useCreateLoanApplication} from 'hooks/useCreateLoanApplication'
import {useLoanApplications} from 'hooks/useLoanApplications'
import {useUser} from 'hooks/useUser'
import {ApplicationBox, Layout} from 'components'
import {Button} from '@solera/ui'
import get from 'lodash/get'
import isNull from 'lodash/isNull'

function DashboardScreen() {
  const navigate = useNavigate()
  const {data} = useLoanApplications()
  const {
    data: {user},
    isFetched,
  } = useUser()
  const create = useCreateLoanApplication()

  const handleCreateClick = async () => {
    let userProfile = user.profile
    if (isNull(user.profile)) {
      userProfile = {}
    }
    create
      .mutateAsync({status: 'started', ...userProfile, email: user.email})
      .then(data => navigate(`/application/${data.uuid}`))
  }

  if (!isFetched || isNull(user)) return null

  return (
    <Layout>
      <h1>Welcome, {get(user, 'profile.first_name', 'Valued Customer')}</h1>
      <Button variant="secondary" onClick={handleCreateClick}>
        Start New Application
      </Button>
      <h2>Current Applications</h2>
      {data.map(app => (
        <ApplicationBox key={app.uuid} data={app} />
      ))}
      {!data.length > 0 && (
        <p>
          You have not yet started an application. Please click the "START NEW
          APPLICATION" button above to get started!
        </p>
      )}
    </Layout>
  )
}

export {DashboardScreen}
