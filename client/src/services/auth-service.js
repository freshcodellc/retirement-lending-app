import {apiBaseUrl, apiClient} from '../utils/api-client'

const accessTokenKey = 'SOLERA/__JWT__'
const refreshTokenKey = 'SOLERA/__REFRESH__'

function getToken() {
  return window.localStorage.getItem(accessTokenKey)
}

function getRefreshToken() {
  return window.localStorage.getItem(refreshTokenKey)
}

async function fetchToken() {
  const tokenFromStorage = getToken()

  const tokenValid = await isTokenValid(tokenFromStorage)

  if (!tokenValid) {
    const refreshedTokens = await refreshAccessToken()
    return refreshedTokens.token
  }

  return tokenFromStorage
}

async function isTokenValid(token) {
  if (token) {
    const payload = {token}
    const response = await window.fetch(`${apiBaseUrl}/auth/tokens/check`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    return result.status
  }
  return false
}

async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      throw Error('Could not find refresh token')
    }

    const payload = {
      refresh_token: refreshToken,
    }

    const response = await window.fetch(`${apiBaseUrl}/auth/tokens`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (response.ok) {
      window.localStorage.setItem(accessTokenKey, result.token)
      return {token: result.token}
    } else {
      throw Error('Error when refreshing token')
    }
  } catch (error) {
    console.error(error)
    onTokensExpired()
    return {token: null}
  }
}

function setTokenInStorage({user}) {
  window.localStorage.setItem(accessTokenKey, user.token)
  window.localStorage.setItem(refreshTokenKey, user.refresh_token)
  return user
}

function login({email, password}) {
  return apiClient('auth/login', {
    data: {email, password},
    method: 'POST',
  }).then(setTokenInStorage)
}

function register(applicantData) {
  return apiClient('applicants/register', {
    data: {user: {...applicantData}},
    method: 'POST',
  }).then(res => res)
}

async function logout() {
  window.localStorage.removeItem(accessTokenKey)
  window.localStorage.removeItem(refreshTokenKey)
  window.location.replace('/')
}

function onTokensExpired() {
  logout()
}

export {getToken, fetchToken, refreshAccessToken, login, register, logout}
