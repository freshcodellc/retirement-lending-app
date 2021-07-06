import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useCreateLoanApplication} from 'hooks/useCreateLoanApplication'
import {useLoanApplications} from 'hooks/useLoanApplications'
import {useUser} from 'hooks/useUser'
import {ApplicationBox, Layout} from 'components'
import {Button} from '@solera/ui'

function DashboardScreen() {
  const navigate = useNavigate()
  const {data} = useLoanApplications()
  const {
    data: {user},
  } = useUser()
  const create = useCreateLoanApplication()

  const handleCreateClick = async () => {
    create
      .mutateAsync({})
      .then(data => navigate(`/application/${data.uuid}`))
  }

  return (
    <Layout>
      <h1>Welcome, {user.first_name}</h1>
      <Button variant="secondary" onClick={handleCreateClick}>
        Start New Application
      </Button>
      <h2>Current Applications</h2>
      {data.map(app => (
        <ApplicationBox key={app.uuid} data={app} />
      ))}
    </Layout>
  )
}

export {DashboardScreen}
