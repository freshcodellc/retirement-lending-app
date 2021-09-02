import {apiSecureClient} from 'utils/api-client'

async function listChangeHistories(uuid) {
  return await apiSecureClient(
    `loan-applications/${uuid}/change-histories`,
  ).then(res => res)
}

const changeHistoryService = {listChangeHistories}
export default changeHistoryService
