/** @jsx jsx */
import * as React from 'react'
import { jsx } from '@emotion/react'
import {
  ListboxList,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxOption as SelectOption
} from '@reach/listbox'
import * as colors from './styles/colors'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

import '@reach/listbox/styles.css'

const SelctEmptyOption = (props) => (
  <SelectOption
    css={{
      color: colors.gray80,
      backgroundColor: colors.gray
    }}
    value='empty'
    {...props}
  />
)

function Select({
  children,
  label,
  name,
  css,
  onChange,
  StartAdornment,
  ...props
}) {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <label
        htmlFor={name}
        css={{ fontWeight: '300', fontSize: '20px', lineHeight: '26px' }}
      >
        {label}
      </label>
      <ListboxInput {...props} onChange={onChange}>
        {({ value, valueLabel, isExpanded }) => (
          <React.Fragment>
            <ListboxButton
              arrow={
                isExpanded ? (
                  <FaCaretUp size='2em' />
                ) : (
                  <FaCaretDown size='2em' />
                )
              }
              css={{
                border: 'none',
                width: '100%',
                padding: '0.5rem 0',
                alignSelf: 'stretch',
                borderBottom: `2px solid ${colors.text}`
              }}
            >
              <span
                data-value={value}
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  color: value === 'empty' && colors.gray80
                }}
              >
                {StartAdornment && value !== 'empty' && (
                  <StartAdornment value={value} />
                )}{' '}
                {valueLabel}
              </span>
            </ListboxButton>
            <ListboxPopover>
              <ListboxList css={{ maxHeight: '300px', overflowY: 'auto' }}>
                {children}
              </ListboxList>
            </ListboxPopover>
          </React.Fragment>
        )}
      </ListboxInput>
    </div>
  )
}

export { Select, SelectOption, SelctEmptyOption }
