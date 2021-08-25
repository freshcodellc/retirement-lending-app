import {useMutation} from 'react-query'
import {queryClient} from 'context/index'
import * as loanApplicationService from 'services/loan-application-service'
import currency from 'currency.js'

function useUpdateApplication({onSuccess = () => {}} = {onSuccess: () => {}}) {
  return useMutation(
    ({uuid, ...fields}) => {
      const cached = queryClient.getQueryData(['loan-application', uuid])

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

      return loanApplicationService.update({
        uuid,
        data: {
          loan_application: {
            ...cached,
            ...updated,
            addresses,
            custodian,
            updated.assigned_admin_user_uuid || cached.assigned_admin?.uuid,
          },
        },
      })
    },
    {
      onMutate: values => {
        const previousData = queryClient.getQueryData('loan-application')

        queryClient.setQueryData('loan-application', old => ({
          ...old,
          ...values,
        }))

        return () => queryClient.setQueryData('loan-application', previousData)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => {
        queryClient.invalidateQueries('loan-application')
        onSuccess()
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
