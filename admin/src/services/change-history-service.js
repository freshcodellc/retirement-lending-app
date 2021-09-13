import {apiSecureClient} from 'utils/api-client'

async function listAdminChangeHistories(uuid) {
  return await apiSecureClient(
    `loan-applications/${uuid}/admin-change-histories`,
  ).then(res => res)
}

const changeHistoryService = {listAdminChangeHistories}
export default changeHistoryService
