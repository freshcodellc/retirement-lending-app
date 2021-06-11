/** @jsxImportSource @emotion/react */
import {
  Routes,
  Route,
  Link as RouterLink,
  Navigate,
  useMatch,
} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'

import ApplicantListScreen from './screens/applicant-list'
import ApplicantDetailsScreen from './screens/applicant-details'
import AdminScreen from './screens/admin'
import NotFoundScreen from './screens/not-found'
import {FullPageErrorFallback, colors} from '@solera/ui'
import {Header, ErrorFallback} from './components'

export default function AuthenticatedApp() {
  const rootRoute = useMatch('/')
  const loginVerified = useMatch('login-verify')

  if (rootRoute || loginVerified) {
    return <Navigate to="applicants" />
  }

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div>
        <div
          css={{
            top: 0,
            zIndex: 999,
            width: '100%',
            position: 'sticky',
          }}
        >
          <Header>
            <ul
              css={{
                margin: 0,
                padding: 0,
                gap: '4rem',
                display: 'grid',
                listStyle: 'none',
                gridAutoFlow: 'column',
              }}
            >
              <li>
                <NavLink to="applicants">Applicants</NavLink>
              </li>
              <li>
                <NavLink to="admin">Admin</NavLink>
              </li>
            </ul>
          </Header>
        </div>
        <main
          css={{
            margin: '0 auto',
            padding: '4rem 1rem',
            width:
              'calc(var(--grid-container-width)/var(--grid-base-width)*100%)',
            maxWidth: 'calc(var(--grid-container-width)*1px)',
          }}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              <Route path="applicants" element={<ApplicantListScreen />} />
              <Route
                path="applicants/:uuid"
                element={<ApplicantDetailsScreen />}
              />
              <Route path="admin" element={<AdminScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function NavLink(props) {
  const matched = useMatch(`${props.to}/*`)

  return (
    <RouterLink
      css={[
        {
          color: colors.base,
          fontSize: '1.2rem',
          textDecoration: 'none',
        },
        matched ? {fontWeight: 'bold', textDecoration: 'underline'} : null,
      ]}
      {...props}
    />
  )
}
