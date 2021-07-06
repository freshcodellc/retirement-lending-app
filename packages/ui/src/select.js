/** @jsx jsx */
import { Fragment } from 'react'
import { jsx } from '@emotion/react'
import {
  ListboxList,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxOption as SelectOption
} from '@reach/listbox'
import { useController } from 'react-hook-form'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import * as colors from './styles/colors'

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

function BaseSelect({
  children,
  label,
  name,
  css,
  onChange,
  StartAdornment,
  hasError,
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
        css={{
          fontWeight: '300',
          fontSize: '20px',
          lineHeight: '26px',
          marginBottom: '0.5rem'
        }}
      >
        {label}
      </label>
      <ListboxInput {...props} onChange={onChange}>
        {({ value, valueLabel, isExpanded }) => (
          <Fragment>
            <ListboxButton
              arrow={
                isExpanded ? (
                  <FaCaretUp size='20px' />
                ) : (
                  <FaCaretDown size='20px' />
                )
              }
              css={{
                border: 'none',
                width: '100%',
                padding: '4px 0',
                alignSelf: 'stretch',
                borderBottom: `2px solid ${
                  hasError ? colors.danger : colors.text
                }`
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
          </Fragment>
        )}
      </ListboxInput>
    </div>
  )
}

function Select({ name, rules, control, defaultValue = 'empty', ...props }) {
  if (rules && rules.required) {
    rules.validate = (value) => value !== 'empty'
  }

  const {
    field: { onChange, value = defaultValue }
  } = useController({ name, control, rules, defaultValue })

  return <BaseSelect value={value} onChange={onChange} {...props} />
}

function ConstantSelect({ options, ...props }) {
  return (
    <Select {...props}>
      <SelctEmptyOption css={{ padding: '0.55rem 0.5rem' }}>
        Select one
      </SelctEmptyOption>
      {options.map((status) => (
        <SelectOption key={status.name} value={status.name}>
          <span css={{ display: 'flex', alignItems: 'center' }}>
            {status.humanized}
          </span>
        </SelectOption>
      ))}
    </Select>
  )
}

const states = getStates()
function UsStateSelect(props) {
  return (
    <Select {...props}>
      <SelctEmptyOption css={{ padding: '0.55rem 0.5rem' }}>
        Select one
      </SelctEmptyOption>
      {states.map((state, i) => (
        <SelectOption key={state} value={state}>
          <span css={{ display: 'flex', alignItems: 'center' }}>{state}</span>
        </SelectOption>
      ))}
    </Select>
  )
}

export { Select, SelectOption, SelctEmptyOption, ConstantSelect, UsStateSelect }

function getStates() {
  return [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ]
}
