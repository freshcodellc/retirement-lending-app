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
    {staleTime: 0},
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
    route: 'property',
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
  postApproval: {
    route: 'post-approval',
    heading: 'post-approval information',
  },
  sign: {
    route: 'full-application-sign-certify',
    heading: 'full application sign and certify',
  },
  termsSign: {
    route: 'term-sheet-sign-certify',
    heading: 'term sheet sign and certify',
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
        ...sections.postApproval,
        fields: postApprovalFields(app),
      },
      {
        ...sections.termsSign,
        fields: termSheetSignCertifyFields(app),
      },
      {
        ...sections.sign,
        fields: signCertifyFields(app),
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
      value: empty(name => netWorthsMap[name])(app.estimated_net_worth_bracket),
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
      label: 'Estimated monthly rent',
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
      label: 'State of formation',
      value: empty()(app.entity_state_of_formation),
    },
    {
      label:
        'What is the name of the financial institution that holds the funds to be used for this investment?',
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
      value: empty()(app?.custodian?.account_type),
    },
    {
      label: 'What is the IRA account number?',
      value: empty()(app?.custodian?.account_number),
    },
  ]
}

function postApprovalFields(app) {
  return [
    {
      label: 'Appraisal Contact Name',
      value: empty()(app?.appraisal_contact_name),
    },
    {
      label: 'Appraisal Contact Email',
      value: empty()(app?.appraisal_contact_email),
    },
    {
      label: 'Appraisal Contact Phone',
      value: empty()(app?.appraisal_contact_phone_number),
    },
    {
      label: 'Insurance Company Email',
      value: empty()(app?.insurance_company_email),
    },
    {
      label: 'Insurance Company Name',
      value: empty()(app?.insurance_company_name),
    },
    {
      label: 'Insurance Company Phone Number',
      value: empty()(app?.insurance_company_phone_number),
    },
    {
      label: 'Title Company or Law Firm Email',
      value: empty()(app?.title_company_or_law_firm_email),
    },
    {
      label: 'Title Company or Law Firm Name',
      value: empty()(app?.title_company_or_law_firm_name),
    },
    {
      label: 'Title Company or Law Firm Phone Number',
      value: empty()(app?.title_company_or_law_firm_phone_number),
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

function termSheetSignCertifyFields(app) {
  return [
    {
      label: 'Name of entity',
      value: empty()(app.entity_name),
    },
    {
      label: 'Signature of authorized signer',
      value: empty()(app.term_sheet_signature),
    },
    {
      label: 'Date',
      value: empty(formatDate)(app.term_sheet_signature_date),
    },
  ]
}

export {useApplication, useInfoSections, sections}
