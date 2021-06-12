import {useMutation} from 'react-query'

function useSendTermsSheet(config) {
  // TODO: send term sheet service
  return useMutation(() => new Promise(res => setTimeout(res, 1000)), config)
}

export {useSendTermsSheet}
