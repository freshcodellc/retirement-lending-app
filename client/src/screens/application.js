import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useCreateLoanApplication} from '../hooks/useCreateLoanApplication'
import {useLoanApplication} from '../hooks/useLoanApplication'
import {Button} from '@solera/ui'

function ApplicationScreen() {
  const {uuid} = useParams()
  const {data} = useLoanApplication(uuid)
  return (
    <div>
      <h1>{data.name}</h1>
      <Link to={`prescreen/1`}>Prescreen</Link>
    </div>
  )
}

export {ApplicationScreen}
