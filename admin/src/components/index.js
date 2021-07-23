/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import {
  colors,
  TextLink,
  FormControl as UiFormControl,
  FormHelperText as UiFormHelperText,
} from '@solera/ui'
import {ReactComponent as Logo} from 'assets/logo.svg'

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

export const FormControl = ({helperText, children}) => (
  <UiFormControl>
    {children}
    {helperText && <UiFormHelperText>{helperText}</UiFormHelperText>}
  </UiFormControl>
)

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

export function ReturnLink({to, variant = 'primary', children}) {
  return (
    <Link
      to={to}
      css={{
        fontSize: '1.1rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
      }}
    >
      <FiArrowLeft color={colors[variant]} css={{marginRight: '4px'}} />
      <TextLink variant={variant}>{children}</TextLink>
    </Link>
  )
}

export function ErrorFallback({error}) {
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


export * from './select'
export * from './datetime'
export * from './radio'
