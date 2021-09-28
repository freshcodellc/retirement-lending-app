/** @jsxImportSource @emotion/react */
import {Button, colors, StatusBadge, TextLink} from '@solera/ui'
import {Link} from 'react-router-dom'
import get from 'lodash/get'
import {format} from 'date-fns'
import {parseISO} from 'date-fns'
import {useConstants} from 'hooks/use-constants'

const TERMS_STATUSES = [
  'started',
  'pre_application_submitted',
  'term_sheet_sent',
]

const EDITABLE_STATUSES = [
  'started',
  'term_sheet_sent',
  'term_sheet_accepted',
  'approved',
]

const TERMS_HELPER_TEXT_MAP = {
  denied: 'Your application was denied. Please contact us for more info.',
  started: 'Pre-application incomplete',
  pre_application_submitted: 'Pre-application received',
  term_sheet_sent: 'Please review and sign your term sheet',
  term_sheet_accepted: 'Please complete full application',
  full_application_complete: 'Your loan is awaiting processing',
  underwriting: 'Your loan is being processed',
  under_review: 'Underwriting complete',
  approved: 'Your loan has been approved',
  complete: 'Your loan has been funded and is now complete.',
}

function ApplicationBox({data}) {
  const {statusesMap} = useConstants()

  const applicationTitle = addresses => {
    if (!addresses || !addresses.length) {
      return 'New Application'
    }

    const propertyAddress = addresses.find(
      address => address.type === 'property',
    )

    return propertyAddress
      ? `Application for ${propertyAddress.address}`
      : 'New Application'
  }

  return (
    <div
      css={{
        border: `2px solid ${colors.secondary}`,
        marginTop: '2.5rem',
      }}
    >
      <div
        css={{
          padding: `2rem 4.5rem`,
          borderBottom: `2px solid ${colors.secondary}`,
        }}
      >
        <p
          css={{
            fontSize: '2rem',
            fontWeight: '500',
            lineHeight: '2.6rem',
            margin: 0,
          }}
        >
          {applicationTitle(data.addresses)}
        </p>
        {typeof data.inserted_at === 'string' && (
          <span css={{fontSize: '1.2rem'}}>
            Started:{' '}
            {format(new Date(parseISO(data.inserted_at)), 'MM/dd/yyyy')}
          </span>
        )}
      </div>
      <div
        css={{
          padding: '4.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div css={{alignSelf: 'stretch'}}>
          <StatusBadge
            status={data.status}
            css={{width: '100%'}}
            label={get(statusesMap, data.status, 'unknown')}
          />
          <p>
            {get(
              TERMS_HELPER_TEXT_MAP,
              data.status,
              'Please contact us for more information',
            )}
          </p>
        </div>
        {EDITABLE_STATUSES.includes(data.status) && (
          <Link to={`/application/${data.uuid}`} css={{marginTop: '2rem'}}>
            <Button variant="secondary">Continue Loan Process</Button>
          </Link>
        )}
        {TERMS_STATUSES.includes(data.status) && (
          <Link
            to={`/application/${data.uuid}/prescreen/2`}
            css={{marginTop: '2.5rem'}}
          >
            <TextLink variant="secondary">Update property address</TextLink>
          </Link>
        )}
      </div>
    </div>
  )
}

export {ApplicationBox}
