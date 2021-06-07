import * as React from 'react'
import {Global, css} from '@emotion/react'
import normalize from 'normalize.css'
import {useAuth} from 'context/auth-context'
import {FullPageSpinner, colors} from '@solera/ui'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

export default function App() {
  const {user} = useAuth()

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Global
        styles={css`
          ${normalize}
          body {
            color: ${colors.text};
          }
        `}
      />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
