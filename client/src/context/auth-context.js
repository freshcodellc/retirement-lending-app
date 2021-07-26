import * as React from 'react'
import {queryClient} from '.'
import * as auth from '../services/auth-service'
import * as userService from '../services/user-service'
import * as loanApplicationService from '../services/loan-application-service'
import {apiSecureClient} from '../utils/api-client'
import {useAsync} from '../utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from '@solera/ui'

async function bootstrapAppData() {
  console.log('here!!')
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await loanApplicationService.list()
    queryClient.setQueryData('loan-applications', data.loan_applications, {
      staleTime: 5000,
    })
    user = {token}
  }
  return user
}

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

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    if (appDataPromise) {
      run(appDataPromise)
    }
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => auth.register(form).then(data => data),
    [],
  )
  const resetPassword = React.useCallback(
    form => userService.resetPassword(form).then(data => data),
    [],
  )
  const confirmReset = React.useCallback(
    form => userService.confirmReset(form).then(data => data),
    [],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({user, login, logout, register, resetPassword, confirmReset}),
    [login, logout, register, user, resetPassword, confirmReset],
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

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback((endpoint, config) => apiSecureClient(endpoint), [])
}

export {AuthProvider, useAuth, useClient}
