/** @jsx jsx */
import styled from '@emotion/styled/macro'
import * as colors from './styles/colors'

const variants = {
  primary: {
    background: colors.primary,
    color: colors.base
  },
  secondary: {
    background: colors.secondary,
    color: colors.base
  }
}

const Button = styled.button(
  {
    border: 0,
    borderRadius: '4px',
    textTransform: 'uppercase',
    padding: '11px 15px',
    lineHeight: '1',
    maxWidth: '300px',
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    },
    '&:disabled': {
      background: colors.gray20,
      color: colors.gray80,
      cursor: 'not-allowed'
    }
  },
  ({ variant = 'primary' }) => variants[variant]
)

const IconButton = styled.button({
  border: 0,
  padding: '6px',
  background: 'none',
  '&:hover': {
    cursor: 'pointer'
  }
})

const CircleButton = styled(
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

export { Button, CircleButton, IconButton }
