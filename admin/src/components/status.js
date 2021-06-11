/** @jsxImportSource @emotion/react */
import * as React from 'react'
import styled from '@emotion/styled/macro'
import {useController} from 'react-hook-form'
import {colors, Select, SelectOption, SelctEmptyOption} from '@solera/ui'

const statusColors = {
  STARTED: colors.yellow,
  APPROVED: colors.green,
  DENIED: colors.gray80,
  FULL_APPLICATION_REQUESTED: colors.yellow,
  FULL_APPLICATION_RECEIVED: colors.orange,
  LOAN_COMMITTEE_REVIEW: colors.green80,
  TERM_SHEET_SENT: colors.green,
  TERM_SHEET_ACCEPTED: colors.green,
  TERMS_SHEET_DENIED: colors.orange,
  PRE_UNDERWRITING: colors.gray80,
  UNDERWRITING: colors.gray80,
}

const StatusColor = styled.div(
  {
    width: '1rem',
    height: '1rem',
    borderRadius: '100%',
    margin: '0.4rem',
    background: colors.gray80,
  },
  ({color}) => ({backgroundColor: color}),
)

function StatusBadge({status}) {
  const color = statusColors[status]

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '1.5rem',
        border: `2px solid ${color}`,
        width: '100%',
      }}
    >
      <StatusColor color={color} />
      <span
        css={{
          fontSize: '0.9rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '200px',
        }}
      >
        {status}
      </span>
    </div>
  )
}

const StatusAdornment = ({value}) => (
  <StatusColor
    color={statusColors[value]}
    css={{margin: '0', marginRight: '4px'}}
  />
)

function StatusSelect({
  name,
  rules,
  options,
  control,
  defaultValue = 'empty',
  ...props
}) {
  const {
    field: {onChange, value = defaultValue},
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <Select
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      StartAdornment={StatusAdornment}
      {...props}
    >
      <SelctEmptyOption value="empty">Select one</SelctEmptyOption>
      {options.map(status => (
        <SelectOption key={status.name} value={status.name}>
          <span css={{display: 'flex', alignItems: 'center'}}>
            <StatusColor color={status.color} />
            {status.humanized}
          </span>
        </SelectOption>
      ))}
    </Select>
  )
}

export {statusColors, StatusBadge, StatusColor, StatusSelect}
