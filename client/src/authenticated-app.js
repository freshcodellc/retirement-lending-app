import {Fragment} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {DashboardScreen} from './screens/dashboard'
import {PreScreenApplicationScreen} from './screens/prescreen-application'
import {NotFoundScreen} from './screens/not-found'
import {ApplicationScreen} from './screens/application'
import {TermsSheetScreen} from './screens/terms-sheet'
import {UserMenu} from './components/user-menu'
import {Header} from '@solera/ui'

function AuthenticatedApp() {
  const navigate = useNavigate()

  const onLogoClick = () => navigate('/')

  return (
    <Fragment>
      <Header onLogoClick={onLogoClick}>
        <UserMenu />
      </Header>
      <main>
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="application/:uuid" element={<ApplicationScreen />} />
          <Route
            path="application/:uuid/prescreen/:step"
            element={<PreScreenApplicationScreen />}
          />
          <Route
            path="application/:uuid/terms-sheet/:step"
            element={<TermsSheetScreen />}
          />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
    </Fragment>
  )
}

export default AuthenticatedApp
