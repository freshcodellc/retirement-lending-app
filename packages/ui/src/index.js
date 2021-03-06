/** @jsx jsx */
import { jsx, keyframes } from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as colors from './styles/colors'
import { FaSpinner } from 'react-icons/fa'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`
})
Spinner.defaultProps = {
  'aria-label': 'loading'
}

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Spinner />
    </div>
  )
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role='alert'
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export * from './button'
export * from './textLink'
export * from './form'
export * from './input'
export * from './table'
export * from './dialog'
export * from './radio'
export * from './select'
export * from './modal'
export * from './checkbox'
export * from './tabs'
export * from './textarea'
export * from './datetime'
export * from './status'
export * from './header'
export * from './modal'
export { FullPageErrorFallback, Spinner, FullPageSpinner, colors }
