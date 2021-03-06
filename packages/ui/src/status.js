/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled/macro'
import { Select, SelectOption, SelctEmptyOption } from './select'
import * as colors from './styles/colors'

const statusColors = {
  notStarted: colors.gray10,
  started: '#C5006E',
  approved: '#8CCF6A',
  complete: '#00B5B5',
  denied: '#E14038',
  full_application_requested: '#FF7B00',
  term_sheet_accepted: '#FFD43B',
  under_review: '#155626',
  pre_application_submitted: '#001493',
  term_sheet_sent: '#6EC7FF',
  terms_sheet_denied: '#E14038',
  full_application_complete: '#3752EE',
  underwriting: '#FFF26E'
}

const StatusColor = styled.div(
  {
    width: '18px',
    height: '18px',
    borderRadius: '100%',
    margin: '5px',
    background: colors.gray10
  },
  ({ color }) => ({ backgroundColor: color })
)

function StatusBadge({ status, label }) {
  const color = statusColors[status]

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '18px',
        border: `2px solid ${color}`
      }}
    >
      <StatusColor color={color} />
      <div
        css={{
          fontSize: '16px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginRight: '10px',
          color: status === 'notStarted' ? colors.gray10 : 'inherit'
        }}
      >
        {label || status.split('_').join(' ').toUpperCase()}
      </div>
    </div>
  )
}

const StatusAdornment = ({ value }) => (
  <StatusColor
    color={statusColors[value]}
    css={{ margin: '0', marginRight: '4px' }}
  />
)

function StatusSelect({ options, ...props }) {
  return (
    <Select StartAdornment={StatusAdornment} {...props}>
      <SelctEmptyOption css={{ padding: '0.55rem 0.5rem' }}>
        Select one
      </SelctEmptyOption>
      {options.map((status) => (
        <SelectOption key={status.name} value={status.name}>
          <span css={{ display: 'flex', alignItems: 'center' }}>
            <StatusColor color={statusColors[status.name]} />
            {status.humanized}
          </span>
        </SelectOption>
      ))}
    </Select>
  )
}

export { statusColors, StatusBadge, StatusColor, StatusSelect }
