import {apiSecureClient} from 'utils/api-client'

async function create(data) {
  return await apiSecureClient('loan-applications', {data})
}

async function list(filters) {
  const params = new URLSearchParams()
  const fields = [
    'page',
    'search_query',
    'status',
    'date_start',
    'date_end',
    'sort_by',
    'sort_direction',
    'only_assigned_to_me',
  ]
  for (const field of fields) {
    let value = filters[field]
    if (!value) {
      if (field === 'date_end' && filters.date_start) {
        value = filters.date_start
      } else {
        continue
      }
    }
    params.append(field, value)
  }
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
