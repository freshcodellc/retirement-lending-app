/** @jsx jsx */
import { jsx } from '@emotion/react'
import * as colors from './styles/colors'

function RadioInput(props) {
  console.log('P', props)
  return (
    <div
      css={{
        display: 'flex',
        width: '100%'
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
            ...props.css
          }}
          type='radio'
          {...props}
        />
        <span
          css={{
            display: 'block',
            width: '18px',
            height: '18px',
            border: `2px solid ${colors.lightBlue}`,
            position: 'relative',
            borderRadius: '50%',
            marginLeft: '10px',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: '4px',
              left: '4px',
              display: 'none',
              width: '10px',
              height: '10px',
              backgroundColor: `${colors.lightBlue}`,
              borderRadius: '50%'
            }
          }}
        />
      </label>
    </div>
  )
}

export { RadioInput }
