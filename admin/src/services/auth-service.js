import {apiPublicClient} from 'utils/api-client'

const localStorageKey = 'SOLERA_ADMIN/__JWT__'

async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function register(applicantData) {
  return apiPublicClient('users/register-applicant', {
    data: {user: {...applicantData}},
  })
}

function login({email, password}) {
  return apiPublicClient('auth/login', {data: {email, password}}).then(
    ({message}) => {
      console.log(message)
    },
  )
}

function verifyLogin({code}) {
  return apiPublicClient('auth/login-verify', {data: {code}}).then(({user}) => {
    console.log('auth user:', user)
    window.localStorage.setItem(localStorageKey, user.token)
    return user
  })
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

const auth = {getToken, register, login, verifyLogin, logout, localStorageKey}
export default auth
