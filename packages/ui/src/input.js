/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/react'
import * as colors from './styles/colors'

const Input = React.forwardRef(({ hasError, helperText, ...props }, ref) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}
  >
    <label
      htmlFor={props.name}
      css={{ fontWeight: '300', fontSize: '20px', lineHeight: '26px' }}
    >
      {props.label}
    </label>
    <input
      css={{
        border: 'none',
        alignSelf: 'stretch',
        padding: '0.5rem 0',
        borderBottom: `2px solid ${hasError ? colors.danger : colors.text}`
      }}
      ref={ref}
      {...props}
    />
  </div>
))

function InputAdornment({ children, end = false, ...props }) {
  const posStyles = end
    ? { right: 0, marginLeft: '4px' }
    : { left: 0, marginRight: '4px' }
  return (
    <div
      css={{
        position: 'absolute',
        marginBottom: '0.4rem',
        bottom: 0,
        ...posStyles
      }}
      {...props}
    >
      {children}
    </div>
  )
}

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

export { Input, InputAdornment, FormControl, FormHelperText }
