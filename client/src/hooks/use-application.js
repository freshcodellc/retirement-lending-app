import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

import * as loanApplicationService from '../services/loan-application-service'

const getLoanApplicationById = async appId => {
  const loan_application = await loanApplicationService.get(appId)
  return loan_application
}

function useApplication() {
  const {uuid} = useParams()
  return useQuery(['loan-application', uuid], () =>
    getLoanApplicationById(uuid),
  )
}

export {useApplication}
