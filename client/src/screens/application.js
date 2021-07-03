import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useLoanApplication} from 'hooks/useLoanApplication'
import {Button} from '@solera/ui'
import {Layout} from 'components'

function ApplicationScreen() {
  const {uuid} = useParams()
  const {data} = useLoanApplication(uuid)

  return (
    <Layout>
      <h1>{data.entity_name}</h1>
      <Link to={`prescreen/1`}>Prescreen</Link>
    </Layout>
  )
}

export {ApplicationScreen}
