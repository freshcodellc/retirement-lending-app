/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {colors} from '@solera/ui'
export default function StatusBadge({status}) {
  const statusColor = {
    Started: colors.yellow,
    Approved: colors.green,
    Denied: colors.gray40,
    'Full Application Requested': colors.yellow,
    'Full Application Received': colors.orange,
    'Loan Committee Review': colors.green80,
    'Term Sheet Sent': colors.green,
    'Term Sheet Accepted': colors.green,
    'Terms Sheet Denied': colors.orange,
    'Pre-Underwriting': colors.gray40,
    Underwriting: colors.gray40,
  }[status]

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '1.5rem',
        border: `2px solid ${statusColor}`,
        width: '100%',
      }}
    >
      <div
        css={{
          width: '18px',
          height: '18px',
          borderRadius: '100%',
          margin: '0.5rem',
          background: statusColor,
        }}
      ></div>
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
