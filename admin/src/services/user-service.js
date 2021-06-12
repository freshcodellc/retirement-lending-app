import {apiClient, apiSecureClient} from 'utils/api-client'

function getLoginUser() {
  return apiSecureClient('users/me')
}

function getAdmins() {
  return apiSecureClient('admins')
}

function sendInvite({email}) {
  return apiSecureClient('admin-invites', {data: {email}})
}

function confirmInvite(token) {
  return apiClient('user-invites/confirm', {data: {token}})
}

function resetPassword({email}) {
  return apiClient('users/password-reset', {data: {email}}).then(
    ({message}) => {
      console.log(message)
    },
  )
}

function confirmResetPassword({reset_token, new_password}) {
  return apiClient('users/password-reset-confirmation', {
    data: {reset_token, new_password},
  })
}

const userService = {
  getLoginUser,
  getAdmins,
  sendInvite,
  confirmInvite,
  resetPassword,
  confirmResetPassword,
}
export default userService
