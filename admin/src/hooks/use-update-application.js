import currency from 'currency.js'
import {useMutation} from 'react-query'
import applicationService from 'services/application-service'
import {useQueryClient} from 'react-query'
import {queryKeys} from 'utils/query-client'

function useUpdateApplication() {
  const queryClient = useQueryClient()

  return useMutation(
    ({uuid, ...fields}) => {
      const cached = queryClient.getQueryData(queryKeys.application(uuid))
      const updated = adaptFields(fields)
      const updatedAddressTypes = (updated.addresses || []).map(a => a.type)
      const addresses = [
        ...(cached.addresses || []).filter(
          a => !updatedAddressTypes.includes(a.type),
        ),
        ...(updated.addresses || []),
      ]
      const custodian = updated.custodian
        ? {
            ...(cached.custodian || {}),
            ...(updated.custodian || {}),
          }
        : null

      return applicationService.update({
        uuid,
        data: {loan_application: {...cached, ...updated, addresses, custodian}},
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('applications', {refetchInactive: true})
      },
    },
  )
}

function adaptFields(fields) {
  const data = {}
  for (const key in fields) {
    let value = fields[key]

    switch (value) {
      case null:
      case undefined:
      case 'empty':
        continue
      case 'true':
        value = true
        break
      case 'false':
        value = false
        break
      default:
    }
    // address fields
    if (['mailing_equal_physical', 'idleStep'].includes(key)) continue
    if (['physical', 'mailing', 'property'].includes(key)) {
      if (!('addresses' in data)) {
        data.addresses = []
      }
      if (key === 'mailing' && fields.mailing_equal_physical) {
        value = {...(fields.physical || {})}
      }

      value.type = key
      const addressPos = data.addresses.findIndex(a => a.type === key)
      if (addressPos !== -1) {
        data.addresses[addressPos] = value
      } else {
        data.addresses.push(value)
      }
      continue
    }
    // currency fields
    if (
      [
        'funding_account_balance',
        'monthly_current_rent',
        'annual_taxes',
        'annual_insurance_premium',
        'monthly_hoa_dues',
        'monthly_mgmt_fee',
        'purchase_price',
        'requested_loan_amount',
        'current_debt_balance',
        'estimated_improvement_costs',
        'estimated_value',
      ].includes(key)
    ) {
      value = currency(value).multiply(100)
    }
    // date fields
    if (['date_of_birth', 'signature_date'].includes(key)) {
      value = new Date(value).toISOString()
    }

    data[key] = value
  }

  return data
}

export {useUpdateApplication}
