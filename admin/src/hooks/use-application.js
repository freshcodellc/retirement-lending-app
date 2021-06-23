import {useMemo} from 'react'
import {useQuery} from 'react-query'
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

function useApplication() {
  const {uuid} = useParams()
  const {data: application = {}, ...result} = useQuery(
    queryKeys.application(uuid),
    () => applicationService.get(uuid),
    {staleTime: 30000},
  )

  return {
    application,
    ...result,
  }
}

const sections = {
  applicant: {
    route: 'applicant',
    heading: 'applicant information',
  },
  property: {
    route: 'property',
    heading: 'property information',
  },
  financing: {
    route: 'financing',
    heading: 'financing information',
  },
  retirement: {
    route: 'eligibility-retirement-account',
    heading: 'eligibility & retirement account information',
  },
  custodian: {
    route: 'custodian-ira',
    heading: 'custodian and IRA information',
  },
  sign: {
    route: 'sign-certify',
    heading: 'sign and certify',
  },
  files: {
    heading: 'applicant files',
  },
}

function useInfoSections(app) {
  const {planTypesMap, entityTypesMap, propertyTypesMap, netWorthsMap} =
    useConstants()

  return useMemo(
    () => [
      {
        ...sections.applicant,
        fields: applicantFields(app, netWorthsMap),
      },
      {
        ...sections.property,
        fields: propertyFields(app, propertyTypesMap),
      },
      {
        ...sections.financing,
        fields: financingFields(app),
      },
      {
        ...sections.retirement,
        fields: eraFields(app, planTypesMap, entityTypesMap),
      },
      {
        ...sections.custodian,
        fields: custodianFields(app),
      },
      {
        ...sections.sign,
        fields: signCertifyFields(app),
      },
      {
        ...sections.files,
        fields: filesFields(app),
      },
    ],
    [app, planTypesMap, entityTypesMap, propertyTypesMap, netWorthsMap],
  )
}

const findAddress = (type, addresses) =>
  addresses.find(address => address.type === type)

const formatDate = str => isoDate(str, 'MM/dd/yy')

function applicantFields(app, netWorthsMap) {
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
      value: empty(name => netWorthsMap[name])(app.estimated_net_worth),
    },
    {
      label: 'Referral source',
      value: empty()(app.referrer),
    },
  ]
}

function propertyFields(app, propertyTypesMap) {
  return [
    {
      label: 'Property address',
      value: empty(address)(findAddress('property', app.addresses)),
    },
    {
      label: 'Property type',
      value: empty(name => propertyTypesMap[name])(app.property_type),
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

function eraFields(app, planTypesMap, entityTypesMap) {
  return [
    {
      label: 'Do you plan to "fix & flip" this property',
      value: empty(yesNo)(app.fix_and_flip),
    },
    {
      label: 'What type of retirement plan do you have?',
      value: empty(name => planTypesMap[name])(app.plan_type),
    },
    {
      label: 'What entity type will the property be titled under?',
      value: empty(name => entityTypesMap[name])(app.entity_type),
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

export {useApplication, useInfoSections, sections}

const app = {
  custodian: {},
  ein: 12345,
  estimated_improvement_costs: 232.2,
  monthly_current_rent: 1234.56,
  fix_and_flip: true,
  interest_rate_spread_high: 0.0,
  number_rental_properties: 12345,
  referrer: 'The Rock',
  signature_title: 'A Signature',
  monthly_estimated_rent: 1234.67,
  well_or_septic: true,
  date_of_birth: '1955-01-01',
  phone_number: '+18014636973',
  signature: 'TOM HANK HI',
  assigned_admin_user_id: 1,
  inserted_at: '2021-06-12T04:35:57Z',
  assigned_admin: {},
  is_homeowner: true,
  annual_taxes: 35.5,
  purchase_price: 555555.55,
  uuid: 'a8ff5d86-3b62-40c8-8b34-a05f61639c12',
  piti_reserve_months: 6, //?
  is_purchase: true,
  interest_rate_range_low: 0.0, //?
  applicant: {},
  entity_name: "John's Vacuums",
  current_debt_balance: 232.2,
  monthly_mgmt_fee: 100.45,
  property_type: 'SINGLE_FAMILY_HOME',
  plan_type: 'IRA',
  years_owned: 15,
  status: 'DENIED',
  built_after_1950: true,
  applicant_user_id: 4,
  middle_name: 'Smith',
  is_rented: true,
  updated_at: '2021-06-12T04:35:57Z',
  funding_institution_name: 'Lizard Shoppe',
  first_name: 'Bob',
  entity_type: 'IRA_LLC',
  year_roof_replaced: 2011,
  estimated_value: 123456.78,
  entity_state_of_formation: 'Utah',
  requested_loan_amount: 1.0e7,
  interest_rate_range_high: 0.0,
  email: 'wow@nice.gov',
  signature_date: '2021-04-17',
  minimum_chargeable_interest_rate: 0.0,
  last_name: 'Vacuum Guy',
  year_last_remodel: 2010,
  years_at_address: 20,
  ssn: '444-44-4444',
  addresses: [],
  application_submitted_at: '1970-01-01T00:00:00Z',
  token: '1234123412', //?
  monthly_hoa_dues: 10.99,
  preapplication_submitted_at: '2021-06-12T04:35:57Z',
  funding_account_balance: 12345.67,
  signature_entity_name: 'Tom Hank',
  estimated_net_worth: '1M_3M',
  interest_rate_spread_low: 0.0,
  annual_insurance_premium: 1.0e3,
  lot_over_2_acres: true,
}
