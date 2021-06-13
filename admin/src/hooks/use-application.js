import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

import {queryKeys} from 'utils/query-client'
import applicationService from 'services/application-service'
import {emptyState, join, phone, isoDate, address, networth} from 'utils/format'

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

const mapValue =
  (...fields) =>
  app =>
    fields.map(field => app[field])

const checkAddress = type => addresses => {
  const matched = addresses.find(address => address.type === type)
  if (!matched) return '-'
  return address(matched)
}

const formatDate = str => isoDate(str, 'MM/dd/yy')

const yesNo = val => (val ? 'Yes' : 'No')

const applicantFields = [
  {
    label: 'Name',
    format: emptyState(join),
    value: mapValue('first_name', 'last_name'),
  },
  {
    label: 'Phone number',
    format: emptyState(phone),
    value: mapValue('phone_number'),
  },
  {
    label: 'Email address',
    format: emptyState(),
    value: mapValue('email'),
  },
  {
    label: 'Date of birth',
    format: emptyState(formatDate),
    value: mapValue('date_of_birth'),
  },
  {
    label: 'Physical address',
    format: emptyState(checkAddress('physical')),
    value: mapValue('addresses'),
  },
  {
    label: 'Live at this address',
    format: emptyState(null, 0),
    value: mapValue('years_at_address'),
  },
  {
    label: 'Own or rent',
    format: owned => (owned ? 'Own' : 'Rent'),
    value: mapValue('is_homeowner'),
  },
  {
    label: 'Social Security Number',
    format: emptyState(),
    value: mapValue('ssn'),
  },
  {
    label: 'Mailing address', // //TODO: get type
    format: emptyState(checkAddress('mailing')),
    value: mapValue('addresses'),
  },
  {
    label: 'Number of rental properties owned',
    format: emptyState(null, 0),
    value: mapValue('number_rental_properties'),
  },
  {
    label: 'Estimated net worth',
    format: emptyState(networth),
    value: mapValue('estimated_net_worth'),
  },
  {
    label: 'Referral source',
    format: emptyState(),
    value: mapValue('referrer'),
  },
]

const propertyFields = [
  {
    label: 'Property address',
    format: emptyState(checkAddress('property')),
    value: mapValue('addresses'),
  },
  {
    label: 'Property type',
    format: emptyState(),
    value: mapValue('property_type'),
  },
  {
    label: 'Is the lot more than 2 acres?',
    format: emptyState(yesNo),
    value: mapValue('lot_over_2_acres'),
  },
  {
    label: 'Was the property built after 1950?',
    format: emptyState(yesNo),
    value: mapValue('built_after_1950'),
  },
  {
    label: 'Is the home on a well or septic system?',
    format: emptyState(yesNo),
    value: mapValue('well_or_septic'),
  },
  {
    label: 'What year was the roof last replaced?',
    format: emptyState(),
    value: mapValue('year_roof_replaced'),
  },
  {
    label: 'When was the property last remodeled?',
    format: emptyState(),
    value: mapValue('year_last_remodel'),
  },
  {
    label: 'Is the property currently rented?',
    format: emptyState(yesNo),
    value: mapValue('is_rented'),
  },
  {
    label: 'Current monthly rent',
    format: emptyState(),
    value: mapValue('monthly_current_rent'),
  },
  {
    label: 'Annual real estate taxes',
    format: emptyState(),
    value: mapValue('annual_taxes'),
  },
  {
    label: 'Annual insurance premiums',
    format: emptyState(),
    value: mapValue('annual_insurance_premium'),
  },
  {
    label: 'Monthly HOA fees',
    format: emptyState(),
    value: mapValue('monthly_hoa_dues'),
  },
  {
    label: 'Monthly property management fees',
    format: emptyState(),
    value: mapValue('monthly_mgmt_fee'),
  },
]

const financingFields = [
  {
    label: 'New purchase or refinance',
    format: emptyState(yesNo),
    value: mapValue('is_purchase'),
  },
  {
    label: 'Requested loan amount*',
    format: emptyState(),
    value: mapValue('requested_loan_amount'),
  },
  {
    label: 'Balance of current debt on the property',
    format: emptyState(),
    value: mapValue('current_debt_balance'),
  },
  {
    label: 'Number of years you have owned the property',
    format: emptyState(),
    value: mapValue('years_owned'),
  },
  {
    label: 'Estimated amount spent on home improvements',
    format: emptyState(),
    value: mapValue('estimated_improvement_costs'),
  },
  {
    label: 'Estimated value of the property',
    format: emptyState(),
    value: mapValue('estimated_value'),
  },
]

const eraFields = [
  {
    label: 'Do you plan to "fix & flip" this property',
    format: emptyState(yesNo),
    value: mapValue('fix_and_flip'),
  },
  {
    label: 'What type of retirement plan do you have?',
    format: emptyState(),
    value: mapValue('plan_type'),
  },
  {
    label: 'What entity type will the property be titled under?',
    format: emptyState(),
    value: mapValue('entity_type'),
  },
  {
    label: 'Name of entity',
    format: emptyState(),
    value: mapValue('entity_name'),
  },
  {
    label: 'EIN',
    format: emptyState(),
    value: mapValue('ein'),
  },
  {
    label: 'Sate of formation',
    format: emptyState(),
    value: mapValue('entity_state_of_formation'),
  },
  {
    label: 'Where are the funds held to be used for this investment?',
    format: emptyState(),
    value: mapValue('funding_institution_name'),
  },
  {
    label:
      'What is the cash balance in the account to be used for this investment?',
    format: emptyState(),
    value: mapValue('funding_account_balance'),
  },
]

const custodianFields = [
  {
    label: 'Name of custodian',
    format: emptyState(),
    value: mapValue('custodian.name'), //TODO: handle nested data
  },
  {
    label: 'Is the IRA account a Roth or Traditional?',
    format: emptyState(),
    value: mapValue(),
  },
  {
    label: 'What is the IRA account number?',
    format: emptyState(),
    value: mapValue(),
  },
]

const signCertifyFields = [
  {
    label: 'Name of entity',
    format: emptyState(),
    value: mapValue('signature_entity_name'),
  },
  {
    label: 'Legal name and title of authorized signer',
    format: emptyState(),
    value: mapValue('signature_title'),
  },
  {
    label: 'Signature of authorized signer',
    format: emptyState(),
    value: mapValue('signature'),
  },
  {
    label: 'Date',
    format: emptyState(formatDate),
    value: mapValue('signature_date'),
  },
]

const infoSections = [
  {
    id: 0,
    heading: 'Applicant Information',
    fields: applicantFields,
  },
  {
    id: 1,
    heading: 'Property Information',
    fields: propertyFields,
  },
  {
    id: 2,
    heading: 'Financing Information',
    fields: financingFields,
  },
  {
    id: 3,
    heading: 'Eligibility & Retirement Account Information',
    fields: eraFields,
  },
  {
    id: 4,
    heading: 'Custodian and IRA Information',
    fields: custodianFields,
  },
  {
    id: 5,
    heading: 'Sign and Certify',
    fields: signCertifyFields,
  },
  {
    id: 6,
    heading: 'Applicant files',
    fields: [],
  },
]

export {useApplication, infoSections}

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
