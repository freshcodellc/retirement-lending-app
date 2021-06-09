import {apiClient, apiSecureClient} from 'utils/api-client'

function getLoginUser() {
  return apiSecureClient('users/me')
}

function getAdmins() {
  return apiSecureClient('users').then(users => {
    return users.filter(user => user.role === 'admin')
  })
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

const userService = {getLoginUser, getAdmins, resetPassword, confirmResetPassword}
export default userService
