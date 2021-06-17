import {useMemo} from 'react'
import {useMutation} from 'react-query'
import {useParams} from 'react-router-dom'

import {queryKeys} from 'utils/query-client'
import {useConstants} from 'hooks/use-constants'
import applicationService from 'services/application-service'
import {
  join,
  phone,
  empty,
  yesNo,
  isoDate,
  address,
  currency,
} from 'utils/format'
import {useApplication, sectionRoutes} from './use-application'

function useEditApplication() {
  const {application} = useApplication()
  const {uuid} = useParams()
  return useMutation(() => new Promise(res => setTimeout(res, 1000)), config)
}

function useInfoSections(app) {
  const {planTypes, entityTypes, propertyTypes, netWorths} = useConstants()

  return useMemo(
    () => [
      {
        heading: 'Applicant Information',
        route: sectionRoutes.applicant,
        fields: applicantFields(app, netWorths),
      },
      {
        heading: 'Property Information',
        route: sectionRoutes.property,
        fields: propertyFields(app, propertyTypes),
      },
      {
        heading: 'Financing Information',
        route: sectionRoutes.financing,
        fields: financingFields(app),
      },
      {
        heading: 'Eligibility & Retirement Account Information',
        route: sectionRoutes.retirement,
        fields: eraFields(app, planTypes, entityTypes),
      },
      {
        heading: 'Custodian and IRA Information',
        route: sectionRoutes.custodian,
        fields: custodianFields(app),
      },
      {
        heading: 'Sign and Certify',
        route: sectionRoutes.sign,
        fields: signCertifyFields(app),
      },
      {
        heading: 'Applicant files',
        fields: filesFields(app),
      },
    ],
    [app, planTypes, entityTypes, propertyTypes, netWorths],
  )
}

const findAddress = (type, addresses) =>
  addresses.find(address => address.type === type)

const formatDate = str => isoDate(str, 'MM/dd/yy')

function applicantFields(app, netWorths) {
  return [
    {
      label: 'Name',
      value: empty(join)(app.first_name, app.last_name),
    },
    {
      label: 'Phone number',
      value: empty(phone)(app.phone_number),
    },
    {
      label: 'Email address',
      value: empty()(app.email),
    },
    {
      label: 'Date of birth',
      value: empty(formatDate)(app.date_of_birth),
    },
    {
      label: 'Physical address',
      value: empty(address)(findAddress('physical', app.addresses)),
    },
    {
      label: 'Live at this address',
      value: empty(null, 0)(app.years_at_address),
    },
    {
      label: 'Own or rent',
      value: empty(owned => (owned ? 'Own' : 'Rent'))(app.is_homeowner),
    },
    {
      label: 'Social Security Number',
      value: empty()(app.ssn),
    },
    {
      label: 'Mailing address',
      value: empty(address)(findAddress('mailing', app.addresses)),
    },
    {
      label: 'Number of rental properties owned',
      value: empty()(app.number_rental_properties),
    },
    {
      label: 'Estimated net worth',
      value: empty(name => netWorths[name])(app.estimated_net_worth),
    },
    {
      label: 'Referral source',
      value: empty()(app.referrer),
    },
  ]
}

function propertyFields(app, propertyTypes) {
  return [
    {
      label: 'Property address',
      value: empty(address)(findAddress('property', app.addresses)),
    },
    {
      label: 'Property type',
      value: empty(name => propertyTypes[name])(app.property_type),
    },
    {
      label: 'Is the lot more than 2 acres?',
      value: empty(yesNo)(app.lot_over_2_acres),
    },
    {
      label: 'Was the property built after 1950?',
      value: empty(yesNo)(app.built_after_1950),
    },
    {
      label: 'Is the home on a well or septic system?',
      value: empty(yesNo)(app.well_or_septic),
    },
    {
      label: 'What year was the roof last replaced?',
      value: empty()(app.year_roof_replaced),
    },
    {
      label: 'When was the property last remodeled?',
      value: empty()(app.year_last_remodel),
    },
    {
      label: 'Is the property currently rented?',
      value: empty(yesNo)(app.is_rented),
    },
    {
      label: 'Current monthly rent',
      value: empty(currency)(app.monthly_current_rent),
    },
    {
      label: 'Annual real estate taxes',
      value: empty(currency)(app.annual_taxes),
    },
    {
      label: 'Annual insurance premiums',
      value: empty(currency)(app.annual_insurance_premium),
    },
    {
      label: 'Monthly HOA fees',
      value: empty(currency)(app.monthly_hoa_dues),
    },
    {
      label: 'Monthly property management fees',
      value: empty(currency)(app.monthly_mgmt_fee),
    },
  ]
}

function financingFields(app) {
  return [
    {
      label: 'New purchase or refinance',
      value: empty(yesNo)(app.is_purchase),
    },
    {
      label: 'Requested loan amount*',
      value: empty(currency)(app.requested_loan_amount),
    },
    {
      label: 'Balance of current debt on the property',
      value: empty(currency)(app.current_debt_balance),
    },
    {
      label: 'Number of years you have owned the property',
      value: empty()(app.years_owned),
    },
    {
      label: 'Estimated amount spent on home improvements',
      value: empty(currency)(app.estimated_improvement_costs),
    },
    {
      label: 'Estimated value of the property',
      value: empty(currency)(app.estimated_value),
    },
  ]
}

function eraFields(app, planTypes, entityTypes) {
  return [
    {
      label: 'Do you plan to "fix & flip" this property',
      value: empty(yesNo)(app.fix_and_flip),
    },
    {
      label: 'What type of retirement plan do you have?',
      value: empty(name => planTypes[name])(app.plan_type),
    },
    {
      label: 'What entity type will the property be titled under?',
      value: empty(name => entityTypes[name])(app.entity_type),
    },
    {
      label: 'Name of entity',
      value: empty()(app.entity_name),
    },
    {
      label: 'EIN',
      value: empty()(app.ein),
    },
    {
      label: 'Sate of formation',
      value: empty()(app.entity_state_of_formation),
    },
    {
      label: 'Where are the funds held to be used for this investment?',
      value: empty()(app.funding_institution_name),
    },
    {
      label:
        'What is the cash balance in the account to be used for this investment?',
      value: empty(currency)(app.funding_account_balance),
    },
  ]
}

function custodianFields(app) {
  return [
    {
      label: 'Name of custodian',
      value: empty()(app?.custodian?.name),
    },
    {
      label: 'Is the IRA account a Roth or Traditional?',
      value: empty()(),
    },
    {
      label: 'What is the IRA account number?',
      value: empty()(),
    },
  ]
}

function signCertifyFields(app) {
  return [
    {
      label: 'Name of entity',
      value: empty()(app.signature_entity_name),
    },
    {
      label: 'Legal name and title of authorized signer',
      value: empty()(app.signature_title),
    },
    {
      label: 'Signature of authorized signer',
      value: empty()(app.signature),
    },
    {
      label: 'Date',
      value: empty(formatDate)(app.signature_date),
    },
  ]
}

function filesFields(app) {
  return [
    {
      label: "Driver's license",
      value: empty()(),
    },
    {
      label: 'Articles of organization',
      value: empty()(),
    },
  ]
}

export {useApplication, useInfoSections, sectionRoutes}
