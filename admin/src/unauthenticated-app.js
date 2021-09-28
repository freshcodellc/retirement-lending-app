/** @jsxImportSource @emotion/react */
import {Routes, Route} from 'react-router-dom'
import ForgotPasswordScreen from './screens/forgot-password/forgot-password'
import LoginScreen from './screens/login/login'
import LoginVerifyScreen from './screens/login-verify/login-verify'
import SignupScreen from './screens/sign-up/sign-up'
import {Header} from 'components'

export default function UnauthenticatedApp() {
  return (
    <>
      <Header />
      <div
        css={{
          width: '100%',
          display: 'flex',
          margin: '0 auto',
          maxWidth: '600px',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem 2rem 4rem',
        }}
      >
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/login-verify" element={<LoginVerifyScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/admin-register" element={<SignupScreen />} />
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </div>
    </>
  )
}
