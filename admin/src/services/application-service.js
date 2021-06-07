import {apiSecureClient} from 'utils/api-client'

async function create(data) {
  return await apiSecureClient('loan-applications', {data})
}

async function list() {
  return apiSecureClient('loan-applications')
}

async function get(uuid) {
  return apiSecureClient(`loan-applications/${uuid}`)
}

async function update({data, uuid}) {
  return apiSecureClient(`loan-applications/${uuid}`, {data, method: 'PUT'})
}

async function constants() {
  return apiSecureClient('loan-applications/constants')
}

const applicationService = {create, get, list, update, constants}
export default applicationService
