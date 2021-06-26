/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox'
import * as colors from './styles/colors'

import '@reach/checkbox/styles.css'

function Checkbox({
  variant,
  checked = false,
  onChange,
  hasError,
  label,
  ...props
}) {
  return (
    <label
      htmlFor={props.id}
      css={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}
    >
      <CustomCheckboxContainer
        css={{
          width: '20px',
          height: '20px',
          borderRadius: '2px',
          border: `2px solid ${
            checked
              ? variant
                ? colors[variant]
                : colors.gray80
              : colors.gray80
          }`,
          background: checked && (variant ? colors[variant] : colors.gray80),
          '&:focus-within': {
            boxShadow: 'none'
          },
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        checked={checked}
        onChange={onChange}
      >
        <CustomCheckboxInput {...props} />
        <span
          aria-hidden
          css={{
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            '&:after': {
              content: '""',
              position: 'absolute',
              display: 'block',
              left: '5px',
              top: '0',
              width: '6px',
              height: '12px',
              border: 'solid white',
              borderWidth: '0 2px 2px 0',
              transform: 'rotate(45deg)'
            }
          }}
        />
      </CustomCheckboxContainer>
      {label}
    </label>
  )
}

export { Checkbox }
