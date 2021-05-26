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
          alignSelf: 'stretch'
        }}
        {...props}
      />
    </div>
  )
}

export { Input }
