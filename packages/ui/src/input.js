/** @jsx jsx */
import { jsx } from '@emotion/react'
import * as colors from './styles/colors'

function Input(props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <label htmlFor={props.name}>{props.label}</label>
      <input
        css={{
          border: 'none',
          alignSelf: 'stretch',
          borderBottom: `1px solid ${colors.tertiary}`,
          ...props.css
        }}
        {...props}
      />
    </div>
  )
}

function InputAdornment({ children, end = false }) {
  const posStyles = end
    ? { right: 0, marginLeft: '4px' }
    : { left: 0, marginRight: '4px' }
  return (
    <div
      css={{
        position: 'absolute',
        margin: '0.3rem 0',
        bottom: 0,
        ...posStyles
      }}
    >
      {children}
    </div>
  )
}

function FormControl({ children }) {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        maxWidth: '300px',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {children}
    </div>
  )
}

export { Input, InputAdornment, FormControl }
