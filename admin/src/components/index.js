/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'

import {colors} from '@solera/ui'
import {ReactComponent as Logo} from 'assets/logo.svg'

export const FormMessage = styled.p(
  {
    fontWeight: 500,
    fontSize: '1rem',
  },
  ({variant = 'normal'}) => ({
    color: {normal: colors.text, error: colors.danger, success: colors.green}[
      variant
    ],
  }),
)

export const AuthForm = styled.form({
  width: '100%',
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  '& > div:not(:first-of-type)': {
    marginTop: '60px',
  },
  '& > div:first-of-type': {
    marginTop: '40px',
  },
})

export const Header = ({children}) => (
  <nav
    css={{
      width: '100%',
      height: 'calc(var(--header-height)*1px)',
      padding: '1rem calc(var(--grid-margin-width)*1px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: colors.base,
      backgroundColor: colors.primary,
    }}
  >
    <div>
      <Link replace to="/">
        <Logo />
      </Link>
    </div>
    {children}
  </nav>
)

export * from './input'
export * from './modal'
export * from './status'
export * from './select'
export * from './button'
export * from './datetime'
export {default as ReturnLink} from './return-link'
export {default as ErrorFallback} from './error-fallback'
