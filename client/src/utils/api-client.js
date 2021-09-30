import * as auth from '../services/auth-service'

export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

async function request(endpoint, config) {
  const response = await window.fetch(`${apiBaseUrl}/${endpoint}`, config)
  if (response.status === 204) {
    return JSON.stringify({})
  }
  const result = await response.json()
  if (response.ok) {
    return result
  } else {
    return Promise.reject(result)
  }
}

export async function apiClient(
  endpoint,
  {data, headers: customHeaders, ...customConfig} = {},
) {
  const config = buildConfig({customHeaders, body: data, customConfig})
  return request(endpoint, config)
}

export async function apiSecureClient(
  endpoint,
  {data, headers: customHeaders, ...customConfig} = {},
) {
  try {
    const token = await auth.fetchToken()
    if (!token) {
      Promise.reject('could not fetch token')
    }
    const authHeaders = buildAuthHeaders(token)
    const config = buildConfig({
      body: data,
      customConfig,
      customHeaders: {...customHeaders, ...authHeaders},
    })
    return request(endpoint, config)
  } catch (error) {
    Promise.reject(error)
  }
}

function buildConfig({
  customHeaders = {},
  body = null,
  method = 'GET',
  customConfig = {},
} = {}) {
  return {
    method,
    body: body ? JSON.stringify(body) : body,
    headers: {
      'Content-Type': body ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }
}

function buildAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  }
}
