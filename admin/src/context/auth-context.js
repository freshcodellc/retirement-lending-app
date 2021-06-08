import * as React from 'react'

import auth from 'services/auth-service'
import {useAsync} from 'hooks/use-async'
import userService from 'services/user-service'
import applicationService from 'services/application-service'
import {FullPageSpinner, FullPageErrorFallback} from '@solera/ui'
import {queryKeys as constantsQueryKeys} from 'hooks/use-constants'
import {queryClient} from 'utils/query-client'
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
    const appDataPromise = bootstrapAppData(queryClient)
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(form => auth.login(form), [])
  const verifyLogin = React.useCallback(
    form =>
      auth.verifyLogin(form).then(user => {
        queryClient.setQueryData('login-user', user, {staleTime: 5000})
        setData(user)
      }),
    [setData],
  )
  const resetPassword = React.useCallback(
    form => userService.resetPassword(form),
    [],
  )
  const confirmResetPassword = React.useCallback(
    form => userService.confirmResetPassword(form),
    [],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({
      user,
      login,
      verifyLogin,
      logout,
      resetPassword,
      confirmResetPassword,
    }),
    [login, verifyLogin, logout, resetPassword, confirmResetPassword, user],
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

async function bootstrapAppData() {
  let user = null

  const hasTokens = auth.hasAuthTokens()

  if (hasTokens) {
    const promises = [
      userService.getLoginUser(),
      applicationService.constants(),
    ]
    const [loginUser, constants] = await Promise.all(promises)
    queryClient.setQueryData(constantsQueryKeys.constants(), constants, {
      staleTime: 5000,
    })
    queryClient.setQueryData('login-user', loginUser, {staleTime: 5000})
    user = loginUser
  }

  return user
}

export {AuthProvider, useAuth}
