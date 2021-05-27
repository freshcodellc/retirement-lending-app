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
          borderBottom: `1px solid ${colors.tertiary}`,
          alignSelf: 'stretch',
          ...props.css
        }}
        {...props}
      />
    </div>
  )
}

function InputAdornment({ children, position = 'start' }) {
  const posStyles =
    position === 'end'
      ? { right: 0, marginLeft: '4px' }
      : { left: 0, marginRight: '4px' }
  return (
    <div
      css={{
        position: 'absolute',
        top: '50%',
        display: 'flex',
        alignItems: 'center',
        transform: 'translate(0px, -50%)',
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
