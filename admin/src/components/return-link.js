/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link} from 'react-router-dom'
import {colors, TextLink} from '@solera/ui'
import {FiArrowLeft} from 'react-icons/fi'

export default function ApplicantDetails({to, variant = 'primary', children}) {
  return (
    <Link
      to={to}
      css={{
        fontSize: '1.1rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
      }}
    >
      <FiArrowLeft color={colors[variant]} css={{marginRight: '4px'}} />
      <TextLink variant={variant}>{children}</TextLink>
    </Link>
  )
}
