import {apiSecureClient} from '../utils/api-client'

async function create(applicationData) {
  return await apiSecureClient('loan-applications', {
    data: {...applicationData},
  }).then(res => res)
}

async function list() {
  return await apiSecureClient('loan-applications').then(res => res)
}

async function get(uuid) {
  return await apiSecureClient(`loan-applications/${uuid}`).then(res => res)
}

async function update({data, uuid}) {
  return await apiSecureClient(`loan-applications/${uuid}`, {
    data,
    method: 'PUT',
  })
}

async function constants() {
  return apiSecureClient('loan-applications/constants')
}

export {create, get, list, update, constants}
