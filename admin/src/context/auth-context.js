import * as React from 'react'
import {useQueryClient} from 'react-query'

import auth from 'services/auth-service'
import {useAsync} from 'hooks/use-async'
import applicationService from 'services/application-service'
import {FullPageSpinner, FullPageErrorFallback} from '@solera/ui'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()
  const queryClient = useQueryClient()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData(queryClient)
    run(appDataPromise)
  }, [run, queryClient])

  const login = React.useCallback(form => auth.login(form), [])
  const verifyLogin = React.useCallback(
    form => auth.verifyLogin(form).then(user => setData(user)),
    [setData],
  )
  const signup = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }, [setData, queryClient])

  const value = React.useMemo(
    () => ({user, login, verifyLogin, logout, signup}),
    [login, verifyLogin, logout, signup, user],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }

  return context
}

async function bootstrapAppData(queryClient) {
  let user = null

  const token = await auth.getToken()

  if (token) {
    const promises = [applicationService.constants(), applicationService.list()]
    const [constants, applications] = await Promise.all(promises)
    queryClient.setQueryData('constants', constants, {staleTime: 5000})
    queryClient.setQueryData('applications', applications, {staleTime: 5000})
    user = {token}
  }

  return user
}

export {AuthProvider, useAuth}
