import {queryCache} from 'react-query'
import auth from 'services/auth-service'

const apiURL = process.env.REACT_APP_API_URL

function makeClient(authRequired) {
  return async (
    endpoint,
    {data, headers: customHeaders, ...customConfig} = {},
  ) => {
    let token
    if (authRequired) {
      token = await auth.getToken()
    }

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

    return window
      .fetch(`${apiURL}/${endpoint}`, config)
      .then(async response => {
        if (response.status === 401) {
          queryCache.clear()
          await auth.logout()
          // refresh the page for them
          window.location.assign(window.location)
          return Promise.reject({message: 'Please re-authenticate.'})
        }
        const data = await response.json()
        if (response.ok) {
          return data
        } else {
          return Promise.reject(data)
        }
      })
  }
}

export const apiSecureClient = makeClient(true)
export const apiPublicClient = makeClient(false)
