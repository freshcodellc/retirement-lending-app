/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/react'
import * as colors from './styles/colors'

const Input = React.forwardRef((props, ref) => (
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
        borderBottom: `2px solid ${colors.text}`,
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

function FormControl({ children, ...props }) {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        maxWidth: '300px',
        alignItems: 'center',
        position: 'relative'
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export { Input, InputAdornment, FormControl }
