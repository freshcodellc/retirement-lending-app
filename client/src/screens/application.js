/** @jsxImportSource @emotion/react */
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useApplication} from 'hooks/use-application'
import {colors, TextLink, StatusBadge} from '@solera/ui'
import {FiArrowRight} from 'react-icons/fi'
import {Layout} from 'components'
import get from 'lodash/get'

const STATUS_STEPS_MAP = {
  denied: 0,
  started: 1,
  pre_application_submitted: 1,
  term_sheet_sent: 2,
  term_sheet_accepted: 3,
  full_application_complete: 3,
  under_review: 3,
  underwriting: 3,
  approved: 4
}

const SECTIONS = [
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
    statuses: ['term_sheet_sent', 'term_sheet_accepted', 'terms_sheet_denied'],
  },
  {
    title: '3 Application Form',
    description:
      'Tell us a little more about yourself, the entity, custodian/IRA, provide documents, sign, and certify.',
    action: 'Start application',
    route: 'application/1',
    statuses: ['full_application_requested', 'full_application_received'],
  },
  {
    title: '4 Post-Approval Form',
    description:
      'To help us complete the loan and to help everything go smoothly, we’ll need to get some logistical details.',
    action: 'Start form',
    route: 'form/1',
    statuses: [],
  },
]

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
        {SECTIONS.map((section, i) => {
          //TODO: better logic to track active & progress section
          const current = get(STATUS_STEPS_MAP, `${data.status}`, 0) > i
          const completed = (i + 1) < get(STATUS_STEPS_MAP, `${data.status}`, 0)
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
                <StatusBadge status={completed ? 'approved' : status} label={completed ? 'Completed' : statusLabel[status]} />
                <p css={{margin: '4rem 0'}}>{section.description}</p>
                {!completed &&
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
                }
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

const statusLabel = {
  denied: 'Loan application denied',
  started: 'Pre-application incomplete',
  pre_application_submitted: 'Awaiting terms sheet',
  term_sheet_sent: 'Term sheet sent',
  term_sheet_accepted: 'Term sheet signed',
  full_application_complete: 'Your appliction is currently being processed',
  underwriting: 'Underwriting complete',
  under_review: 'Additional information requested',
  approved: 'Appraisal scheduled',
}

export {ApplicationScreen}
