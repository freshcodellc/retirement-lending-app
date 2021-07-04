/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled/macro'
import { Select, SelectOption, SelctEmptyOption } from './select'
import * as colors from './styles/colors'

const statusColors = {
  notStarted: colors.gray10,
  started: '#C5006E',
  approved: '#8CCF6A',
  denied: '#E14038',
  full_application_requested: '#FF7B00',
  full_application_received: '#FFD43B',
  loan_committee_review: '#155626',
  term_sheet_sent: '#001493',
  term_sheet_accepted: '#6EC7FF',
  terms_sheet_denied: '#E14038',
  pre_underwriting: '#3752EE',
  underwriting: '#FFF26E'
}

const StatusColor = styled.div(
  {
    width: '1.6rem',
    height: '1.6rem',
    borderRadius: '100%',
    margin: '0.6rem',
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
        borderRadius: '1.5rem',
        border: `2px solid ${color}`,
        width: '100%'
      }}
    >
      <StatusColor color={color} />
      <span
        css={{
          fontSize: '1.6rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '500px',
          color: status === 'notStarted' ? colors.gray10 : colors.text
        }}
      >
        {label || status}
      </span>
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
