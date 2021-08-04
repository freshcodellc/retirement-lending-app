import {apiSecureClient} from 'utils/api-client'

async function add(note) {
  return await apiSecureClient('loan-application-notes', {data: {note}})
}

async function edit({uuid, ...note}) {
  return apiSecureClient(`loan-application-notes/${uuid}`, {
    data: {note},
    method: 'PUT',
  })
}

async function remove(uuid) {
  return apiSecureClient(`loan-application-notes/${uuid}`, {method: 'DELETE'})
}

const noteService = {add, edit, remove}
export default noteService
