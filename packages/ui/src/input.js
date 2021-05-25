/** @jsx jsx */
import { jsx } from '@emotion/react'

function Input(props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <label htmlFor={props.name}>{props.label}</label>
      <input
        css={{
          border: 'none',
          borderBottom: '1px solid black'
        }}
        {...props}
      />
    </div>
  )
}

export { Input }
