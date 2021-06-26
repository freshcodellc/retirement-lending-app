/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/react'
import * as colors from './styles/colors'

const RadioInput = React.forwardRef((props, ref) => {
  return (
    <div
      css={{
        display: 'flex',
        marginRight: '35px',
        '&:hover': {
          cursor: 'pointer'
        }
      }}
    >
      <label
        htmlFor={props.id}
        css={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
      >
        {props.label}
        <input
          css={{
            opacity: '0',
            position: 'absolute',
            '&:checked ~ span:after': {
              display: 'block'
            },
            '&:hover': {
              cursor: 'pointer'
            },
            ...props.css
          }}
          ref={ref}
          type='radio'
          id={props.id}
          {...props}
        />
        <span
          css={{
            display: 'block',
            width: '22px',
            height: '22px',
            border: `2px solid ${colors.gray80}`,
            position: 'relative',
            borderRadius: '50%',
            marginRight: '10px',
            '&:hover': {
              cursor: 'pointer'
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              top: '4px',
              left: '4px',
              display: 'none',
              width: '10px',
              height: '10px',
              backgroundColor: `${colors.gray80}`,
              borderRadius: '50%'
            }
          }}
        />
      </label>
    </div>
  )
})

function RadioGroup({ text, children }) {
  return (
    <div css={{ marginTop: '65px' }}>
      <div
        css={{
          marginBottom: '0.5rem',
          fontWeight: '300',
          fontSize: '20px',
          lineHeight: '26px'
        }}
      >
        {text}
      </div>
      <div css={{ display: 'flex' }}>{children}</div>
    </div>
  )
}

export { RadioInput, RadioGroup }
