import {apiSecureClient} from 'utils/api-client'

const listFields = [
  'page',
  'search_query',
  'status',
  'date_start',
  'date_end',
  'sort_by',
  'sort_direction',
  'only_assigned_to_me',
]

async function list(filters) {
  const params = new URLSearchParams()
  for (const field of listFields) {
    let value = filters[field]
    if (!value) continue
    switch (field) {
      case 'date_start':
      case 'date_end':
        value = value.toISOString()
        break
      default:
    }
    params.append(field, value)
  }
  return apiSecureClient(`loan-applications?${params}`)
}

async function create(data) {
  return await apiSecureClient('loan-applications', {data})
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
