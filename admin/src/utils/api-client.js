import auth from 'services/auth-service'

export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

function makeClient(authRequired) {
  return async (
    endpoint,
    {data, headers: customHeaders, ...customConfig} = {},
  ) => {
    let token
    if (authRequired) {
      token = auth.getAccessToken()
      if (!token) {
        await auth.refreshAccessToken()
      }
    }

    console.log('CC', customConfig)

    const config = {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': data ? 'application/json' : undefined,
        ...customHeaders,
      },
      ...customConfig,
    }

    const response = await window.fetch(`${apiBaseUrl}/${endpoint}`, config)

    if (authRequired && response.status === 401) {
      await auth.refreshAccessToken()
    }

    const result = await response.json()

    if (response.ok) {
      return result
    } else {
      return Promise.reject(result)
    }
  }
}

export const apiClient = makeClient(false)
export const apiSecureClient = makeClient(true)
