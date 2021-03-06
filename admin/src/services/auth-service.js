import {queryClient} from 'utils/query-client'
import {apiClient, apiBaseUrl} from 'utils/api-client'

const accessTokenKey = 'SOLERA_ADMIN/__JWT__'
const refreshTokenKey = 'SOLERA_ADMIN/__REFRESH__'

function hasAuthTokens() {
  return !!getAccessToken() && !!getRefreshToken()
}

function getAccessToken() {
  return window.localStorage.getItem(accessTokenKey)
}

function getRefreshToken() {
  return window.localStorage.getItem(refreshTokenKey)
}

async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      onTokensExpired()
    }
    const response = await window.fetch(`${apiBaseUrl}/auth/tokens`, {
      method: 'PUT',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      window.localStorage.setItem(accessTokenKey, result.token)
    } else {
      onTokensExpired()
    }
  } catch (error) {
    console.error(error)
    onTokensExpired()
  }
}

function signup({invite_token, user, profile}) {
  return apiClient('admins/register', {data: {invite_token, user, profile}})
}

function login({email, password}) {
  return apiClient('auth/login', {data: {email, password}}).then(
    ({message}) => {
      console.log(message)
    },
  )
}

function verifyLogin({code}) {
  return apiClient('auth/login-verify', {data: {code}}).then(({user}) => {
    window.localStorage.setItem(accessTokenKey, user.token)
    window.localStorage.setItem(refreshTokenKey, user.refresh_token)
    return user
  })
}

function logout() {
  window.localStorage.removeItem(accessTokenKey)
  window.localStorage.removeItem(refreshTokenKey)
}

function onTokensExpired() {
  logout()
  queryClient.clear()
}

const auth = {
  hasAuthTokens,
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  login,
  verifyLogin,
  signup,
  logout,
}
export default auth
