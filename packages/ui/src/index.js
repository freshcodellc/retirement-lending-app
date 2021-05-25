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

var CircleButton = styled(
  'button',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'ebrv2kl0'
      }
    : {
        target: 'ebrv2kl0',
        label: 'CircleButton'
      }
)(
  {
    borderRadius: '30px',
    padding: '0',
    width: '40px',
    height: '40px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'red',
    color: 'black',
    border: '1px solid black',
    cursor: 'pointer'
  },
  process.env.NODE_ENV === 'production'
    ? ''
    : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVxQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkL21hY3JvJ1xuXG5jb25zdCBDaXJjbGVCdXR0b24gPSBzdHlsZWQuYnV0dG9uKHtcbiAgYm9yZGVyUmFkaXVzOiAnMzBweCcsXG4gIHBhZGRpbmc6ICcwJyxcbiAgd2lkdGg6ICc0MHB4JyxcbiAgaGVpZ2h0OiAnNDBweCcsXG4gIGxpbmVIZWlnaHQ6ICcxJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBiYWNrZ3JvdW5kOiAncmVkJyxcbiAgY29sb3I6ICdibGFjaycsXG4gIGJvcmRlcjogYDFweCBzb2xpZCBibGFja2AsXG4gIGN1cnNvcjogJ3BvaW50ZXInXG59KVxuXG5leHBvcnQgeyBDaXJjbGVCdXR0b24gfVxuIl19 */'
)

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

export { FullPageErrorFallback, CircleButton, Spinner, FullPageSpinner }
