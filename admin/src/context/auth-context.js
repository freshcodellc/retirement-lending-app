import * as React from 'react'

import auth from 'services/auth-service'
import {useAsync} from 'hooks/use-async'
import userService from 'services/user-service'
import applicationService from 'services/application-service'
import {FullPageSpinner, FullPageErrorFallback} from '@solera/ui'
import {queryClient, queryKeys} from 'utils/query-client'
import {Header} from 'components'

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
        queryClient.setQueryData(queryKeys.me, user)
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
  const signup = React.useCallback(form => auth.signup(form), [])
  const logout = React.useCallback(() => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      signup,
      verifyLogin,
      resetPassword,
      confirmResetPassword,
    }),
    [
      user,
      login,
      logout,
      signup,
      verifyLogin,
      resetPassword,
      confirmResetPassword,
    ],
  )

  if (isLoading || isIdle) {
    return (
      <React.Fragment>
        <Header />
        <FullPageSpinner />
      </React.Fragment>
    )
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
    const promises = [userService.getMe(), applicationService.constants()]
    const [me, constants] = await Promise.all(promises)
    queryClient.setQueryData(queryKeys.me, me)
    queryClient.setQueryData(queryKeys.constants, constants)
    user = me
  }

  return user
}

export {AuthProvider, useAuth}
