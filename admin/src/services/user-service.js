import {apiPublicClient} from 'utils/api-client'

function resetPassword({email}) {
  return apiPublicClient('users/password-reset', {data: {email}})
}

function confirmReset({reset_token, new_password}) {
  return apiPublicClient('users/password-reset-confirmation', {
    data: {reset_token, new_password},
  })
}

const userService = {resetPassword, confirmReset}
export default userService
