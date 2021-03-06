import {Fragment} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {ForgotPasswordScreen} from './screens/forgot-password'
import {LoginScreen} from './screens/login'
import {ResetPasswordScreen} from './screens/reset-password'
import {SignUpScreen} from './screens/sign-up'
import {Header} from '@solera/ui'

function UnauthenticatedApp() {
  const navigate = useNavigate()

  const onLogoClick = () => navigate('/')

  return (
    <Fragment>
      <Header onLogoClick={onLogoClick} />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    </Fragment>
  )
}

export default UnauthenticatedApp
