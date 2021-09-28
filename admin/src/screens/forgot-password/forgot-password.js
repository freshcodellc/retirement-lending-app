/** @jsxImportSource @emotion/react */
import {useSearchParams} from 'react-router-dom'

import {ResetPasswordForm} from './reset-password-form'
import {NewPasswordForm} from './new-password-form'

export default function ForgotPasswordScreen() {
  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get('token')
  const routedFromResetEmail = searchParams.has('token')

  return routedFromResetEmail ? (
    <NewPasswordForm resetToken={resetToken} />
  ) : (
    <ResetPasswordForm />
  )
}
