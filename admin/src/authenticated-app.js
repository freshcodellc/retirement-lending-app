/** @jsxImportSource @emotion/react */
import {Routes, Route, Link as RouterLink, useMatch} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import ApplicantListScreen from './screens/applicant-list'
import ApplicantDetailsScreen from './screens/applicant-details'
import AdminScreen from './screens/admin'
import NotFoundScreen from './screens/not-found'
import {FullPageErrorFallback, colors} from '@solera/ui'
import {ReactComponent as Logo} from 'assets/logo.svg'

export default function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div>
        <header
          css={{
            top: 0,
            width: '100%',
            zIndex: 999,
            position: 'sticky',
            backgroundColor: colors.primary,
          }}
        >
          <Nav />
        </header>
        <main
          css={{
            margin: '0 auto',
            padding: '5rem 1rem',
            width:
              'calc(var(--grid-container-width)/var(--grid-base-width)*100%)',
            maxWidth: 'calc(var(--grid-container-width)*1px)',
          }}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function Nav(params) {
  return (
    <nav
      css={{
        width: '100%',
        height: 'calc(var(--header-height)*1px)',
        padding: '1rem calc(var(--grid-margin-width)*1px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: colors.base,
      }}
    >
      <div><Logo /></div>
      <ul
        css={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gridAutoFlow: 'column',
          gap: '4rem',
        }}
      >
        <li>
          <NavLink to="/applicants">Applicants</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
      </ul>
    </nav>
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/applicants" element={<ApplicantListScreen />} />
      <Route
        path="/applicants/:applicantId"
        element={<ApplicantDetailsScreen />}
      />
      <Route path="/admin" element={<AdminScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function ErrorFallback({error}) {
  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error}
    </div>
  )
}
