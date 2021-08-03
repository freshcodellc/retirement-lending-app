import {Fragment} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {DashboardScreen} from './screens/dashboard'
import {PreScreenApplicationScreen} from './screens/prescreen-application'
import {NotFoundScreen} from './screens/not-found'
import {ApplicationScreen} from './screens/application'
import {ProfileUpdateScreen} from './screens/profile-update'
import {TermsSheetScreen} from './screens/terms-sheet'
import {FullApplicationScreen} from './screens/full-application'
import {PostApprovalScreen} from './screens/post-approval'
import {UserMenu} from './components/user-menu'
import {Header} from '@solera/ui'
import {useUser} from 'hooks/useUser'
import isNull from 'lodash/isNull'

function AuthenticatedApp() {
  const navigate = useNavigate()
  const onLogoClick = () => navigate('/')
  const {
    data: {user},
    isFetched,
  } = useUser()

  if (!isFetched || isNull(user)) return null

  return (
    <Fragment>
      <Header onLogoClick={onLogoClick}>
        <UserMenu />
      </Header>
      <main>
        {!user.profile ? (
          <Routes>
            <Route
              path="*"
              element={
                <ProfileUpdateScreen prompt="Almost finished! Before you can get started with your application(s), please fill out your profile information." />
              }
            />
          </Routes>
        ) : (
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
            <Route
              path="application/:uuid/full/:step"
              element={<FullApplicationScreen />}
            />
            <Route
              path="application/:uuid/post-approval/:step"
              element={<PostApprovalScreen />}
            />
            <Route path="/profile/update" element={<ProfileUpdateScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        )}
      </main>
    </Fragment>
  )
}

export default AuthenticatedApp
