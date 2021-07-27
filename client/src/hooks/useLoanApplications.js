import * as loanApplicationService from '../services/loan-application-service'
import {useQuery} from 'react-query'

const getLoanApplications = async () => {
  const {loan_applications} = await loanApplicationService.list()
  return loan_applications
}

function useLoanApplications() {
  return useQuery('loan-applications', getLoanApplications)
}

export {useLoanApplications}
