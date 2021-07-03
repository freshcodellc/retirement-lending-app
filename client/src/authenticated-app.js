import {Fragment} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {DashboardScreen} from './screens/dashboard'
import {PreScreenApplicationScreen} from './screens/prescreen-application'
import {NotFoundScreen} from './screens/not-found'
import {ApplicationScreen} from './screens/application'
import {Header} from '@solera/ui'

function AuthenticatedApp() {
  const navigate = useNavigate()

  const onLogoClick = () => navigate('/')

  return (
    <Fragment>
      <Header onLogoClick={onLogoClick} />
      <main>
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="application/:uuid" element={<ApplicationScreen />} />
          <Route
            path="application/:uuid/prescreen/:step"
            element={<PreScreenApplicationScreen />}
          />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
    </Fragment>
  )
}

export default AuthenticatedApp
