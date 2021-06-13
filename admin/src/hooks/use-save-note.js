import {useMutation} from 'react-query'

function useSaveNote(config) {
  // TODO: send term sheet service
  return useMutation(() => new Promise(res => setTimeout(res, 1000)), config)
}

export {useSaveNote}
