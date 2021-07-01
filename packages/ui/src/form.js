/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as colors from './styles/colors'

function FormHelperText({ children }) {
  return (
    <div
      css={{
        width: '100%',
        minHeight: '2rem',
        position: 'relative'
      }}
    >
      <div
        css={{
          left: 0,
          right: 0,
          top: '8px',
          fontSize: '0.9rem',
          position: 'absolute'
        }}
      >
        {children}
      </div>
    </div>
  )
}

function FormControl({ children, ...props }) {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column'
      }}
      {...props}
    >
      {children}
    </div>
  )
}

const FormMessage = styled.p(
  {
    fontWeight: 500,
    fontSize: '1rem'
  },
  ({ variant = 'normal' }) => ({
    color: { normal: colors.text, error: colors.danger, success: colors.green }[
      variant
    ]
  })
)

export { FormControl, FormHelperText, FormMessage }
