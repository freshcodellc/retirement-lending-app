import {apiSecureClient} from 'utils/api-client'

async function create(data) {
  return await apiSecureClient('loan-applications', {data})
}

async function list({
  page = 1,
  search_query = '',
  date_start = '',
  date_end = '',
}) {
  const params = new URLSearchParams()
  params.append('page', page)
  params.append('search_query', search_query)
  params.append('date_start', date_start)
  params.append('date_end', date_end)
  return apiSecureClient(`loan-applications?${params}`)
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
