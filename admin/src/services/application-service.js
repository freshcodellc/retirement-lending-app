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
    switch (field) {
      case 'date_start':
      case 'date_end':
        value = value ? value.toISOString() : undefined
        break
      case 'status':
        value = value === 'empty' ? undefined : value
        break
      default:
    }
    if (!value) continue
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

async function update(data) {
  const app = {}
  for (const key in data) {
    let value = data[key]
    if ([null, undefined, 'empty'].includes(value)) continue
    if (['mailing_equal_physical'].includes(key)) continue
    if (['physical', 'mailing', 'property'].includes(key)) {
      //TODO: handle updating addresses
    }
    app[key] = value
  }
  console.log(app)
  return Promise.resolve()
  // return apiSecureClient(`loan-applications/${uuid}`, {data, method: 'PUT'})
}

async function constants() {
  return apiSecureClient('loan-applications/constants')
}

const applicationService = {create, get, list, update, constants}
export default applicationService
