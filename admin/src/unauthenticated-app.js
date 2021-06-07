/** @jsxImportSource @emotion/react */
import {Routes, Route} from 'react-router-dom'
import ForgotPasswordScreen from './screens/forgot-password'
import LoginScreen from './screens/login'
import LoginVerifyScreen from './screens/login-verify'
import NotFoundScreen from './screens/not-found'
import ResetPasswordScreen from './screens/reset-password'
import SignUpScreen from './screens/sign-up'
import {Header} from 'components'

export default function UnauthenticatedApp() {
  return (
    <>
      <Header />
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 2rem 4rem',
          flexDirection: 'column',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/verify" element={<LoginVerifyScreen />} />
          <Route path="/sign-up" element={<SignUpScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>
    </>
  )
}
