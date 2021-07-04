/** @jsxImportSource @emotion/react */
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useApplication} from 'hooks/use-application'
import {colors, TextLink, StatusBadge} from '@solera/ui'
import {FiArrowRight} from 'react-icons/fi'
import {Layout} from 'components'

function ApplicationScreen() {
  const navigate = useNavigate()
  const {data} = useApplication()

  return (
    <Layout css={{alignItems: 'center'}}>
      <h1 css={{marginBottom: '7rem'}}>{data.entity_name}</h1>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        {[
          {
            title: '1 Pre-screen Application',
            description:
              'Tell us about yourself and the property so we can determine eligibility.',
            action: 'Start application',
            route: 'prescreen/1',
            statuses: ['started', 'pre_underwriting'],
          },
          {
            title: '2 Terms sheet',
            description:
              'To help us complete the loan and to help everything go smoothly, we’ll need to get some logistical details.',
            action: 'Start sheet',
            route: 'terms-sheet/1',
            statuses: [
              'term_sheet_sent',
              'term_sheet_accepted',
              'terms_sheet_denied',
            ],
          },
          {
            title: '3 Application Form',
            description:
              'Tell us a little more about yourself, the entity, custodian/IRA, provide documents, sign, and certify.',
            action: 'Start application',
            route: 'application/1',
            statuses: [
              'full_application_requested',
              'full_application_received',
            ],
          },
          {
            title: '4 Post-Approval Form',
            description:
              'To help us complete the loan and to help everything go smoothly, we’ll need to get some logistical details.',
            action: 'Start form',
            route: 'form/1',
            statuses: [],
          },
        ].map((section, i) => {
          //TODO: better logic to track active & progress section
          const current = section.statuses.includes(data.status)
          const status = current ? data.status : 'notStarted'
          const headingColor = current ? 'white' : colors.text
          const highLightColor = current ? colors.blue : colors.gray20
          const action = current ? 'View and edit' : section.action

          return (
            <div
              key={section.title}
              css={{border: `1px solid ${highLightColor}`}}
            >
              <div
                css={{
                  color: headingColor,
                  padding: '1.9rem 4rem',
                  background: highLightColor,
                }}
              >
                <h3>{section.title}</h3>
              </div>
              <div css={{padding: '4rem'}}>
                <StatusBadge status={status} label={statusLabel[status]} />
                <p css={{margin: '4rem 0'}}>{section.description}</p>
                <TextLink
                  onClick={() => navigate(section.route)}
                  disabled={!current}
                  variant="secondary"
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {action}
                  <FiArrowRight fontSize="2rem" css={{marginLeft: '1rem'}} />
                </TextLink>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

const statusLabel = {
  notStarted: 'Status: Not started',
  started: 'Pre-application incomplete',
  approved: 'Appraisal scheduled',
  approved1: 'Closing date scheduled', //TODO: what's the difference here??
  denied: 'Loan application denied',
  term_sheet_sent: 'Term sheet sent',
  term_sheet_accepted: 'Term sheet signed',
  terms_sheet_denied: 'Loan application denied',
  full_application_requested: 'Please complete full loan application',
  full_application_received: 'Your appliction is currently being processed',
  underwriting: 'Underwriting complete',
  loan_committee_review: 'Additional information requested',
  pre_underwriting: 'Pre-application received',
}

export {ApplicationScreen}
