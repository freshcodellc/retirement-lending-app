/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {isSameDay, parseISO} from 'date-fns'
import toast from 'react-hot-toast'
import currency from 'currency.js'

import {useForm} from 'react-hook-form'
import {useConstants} from 'hooks/use-constants'
import {useUpdateApplication} from 'hooks/use-update-application'

import {
  Button,
  colors,
  DatePicker,
  FormMessage,
  Input,
  CurrencyInput,
} from '@solera/ui'

import {StatusSelect, AdminSelect} from 'components'

export function ActionsPanel({activeTab, application}) {
  const [updateWarning, setUpdateWarning] = React.useState('')
  const {mutate, isError, isSuccess, isLoading} = useUpdateApplication()
  const {statuses, humanizedTextFor} = useConstants()

  React.useEffect(() => {
    if (isError) {
      toast.error('Failed to Update. Please try again.')
    }
  }, [isError])

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully updated!')
    }
  }, [isSuccess])

  const {handleSubmit, watch, control, register, formState} = useForm({
    mode: 'onChange',
    defaultValues: {
      estimated_closing_date: application.estimated_closing_date,
      estimated_appraisal_delivery_date:
        application.estimated_appraisal_delivery_date,
      status: application.status,
      admin: application.assigned_admin?.uuid,
      interest_rate_floor: application.interest_rate_floor,
      interest_rate_range_low: application.interest_rate_range_low,
      interest_rate_range_high: application.interest_rate_range_high,
      interest_rate_spread_low: application.interest_rate_spread_low,
      interest_rate_spread_high: application.interest_rate_spread_high,
      loan_to_value_percentage: application.loan_to_value_percentage,
      piti_reserve_months: application.piti_reserve_months,
      estimated_appraisal_cost: currency(application.estimated_appraisal_cost, {
        fromCents: true,
      }).format({symbol: ''}),
    },
  })

  const statusWatcher = watch('status')
  const estimatedClosingDateWatcher = watch('estimated_closing_date')
  const estimatedAppraisalDeliverDateWatcher = watch(
    'estimated_appraisal_delivery_date',
  )

  React.useEffect(() => {
    const emailWarningStatuses = [
      'pre_application_submitted',
      'term_sheet_sent',
      'term_sheet_accepted',
      'full_application_complete',
      'under_review',
      'approved',
      'denied',
      'estimated_appraisal_delivery_date_set',
      'estimated_closing_date_set',
    ]

    if (
      application.status !== statusWatcher &&
      emailWarningStatuses.includes(statusWatcher)
    ) {
      setUpdateWarning(
        `Warning: Changing the status of the application to '${humanizedTextFor(
          statuses,
          statusWatcher,
        )}' will email the customer.`,
      )
    } else {
      setUpdateWarning('')
    }
  }, [statusWatcher, application.status])

  React.useEffect(() => {
    const oldDate = parseISO(application.estimated_appraisal_delivery_date)

    let newDate
    if (
      estimatedAppraisalDeliverDateWatcher &&
      typeof estimatedAppraisalDeliverDateWatcher === 'string'
    ) {
      newDate = parseISO(estimatedAppraisalDeliverDateWatcher)
    } else {
      newDate = estimatedAppraisalDeliverDateWatcher
    }

    if (newDate && !isSameDay(oldDate, newDate)) {
      setUpdateWarning(
        'Warning: Updating the estimated appraisal delivery date will email the customer.',
      )
    } else {
      setUpdateWarning('')
    }
  }, [estimatedAppraisalDeliverDateWatcher])

  React.useEffect(() => {
    const oldDate = parseISO(application.estimated_closing_date)

    let newDate
    if (
      estimatedClosingDateWatcher &&
      typeof estimatedClosingDateWatcher === 'string'
    ) {
      newDate = parseISO(estimatedClosingDateWatcher)
    } else {
      newDate = estimatedClosingDateWatcher
    }

    if (newDate && !isSameDay(oldDate, newDate)) {
      setUpdateWarning(
        'Warning: Updating the estimated closing date will email the customer.',
      )
    } else {
      setUpdateWarning('')
    }
  }, [estimatedClosingDateWatcher])

  const handleSaveActionsPanel = handleSubmit(({status, admin, ...rates}) => {
    mutate({
      ...rates,
      estimated_appraisal_cost:
        parseFloat(rates.estimated_appraisal_cost) * 100,
      status,
      assigned_admin_user_uuid: admin,
      uuid: application.uuid,
    })
  })

  return (
    <form
      name="terms-sheet"
      onSubmit={handleSaveActionsPanel}
      css={{
        flexDirection: 'column',
        border: `5px solid ${colors.gray40}`,
        display: activeTab !== 0 ? 'none' : 'flex',
        padding: '2rem',
        marginBottom: '2rem',
      }}
    >
      <div
        css={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem',
          justifyContent: 'space-between',
          '&>div': {
            width: '100%',
            maxWidth: '300px',
            minWidth: '200px',
          },
        }}
      >
        <div>
          <StatusSelect
            id="status"
            name="status"
            label="Status"
            control={control}
            rules={{required: true}}
          />
          <AdminSelect
            id="admin"
            name="admin"
            control={control}
            label="Assigned to"
            css={{marginTop: '2rem'}}
            rules={{required: true}}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="secondary"
            isLoading={isLoading}
            disabled={!formState.isValid}
          >
            Update
          </Button>
          {updateWarning && <FormMessage>{updateWarning}</FormMessage>}
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginBottom: '2rem',
          '&>*': {
            width: '100%',
            maxWidth: '200px',
            minWidth: '200px',
          },
        }}
      >
        <Input
          type="text"
          placeholder="%"
          label="Floor rate"
          {...register('interest_rate_floor', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Low rate"
          {...register('interest_rate_range_low', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="High rate"
          {...register('interest_rate_range_high', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Margin low rate"
          {...register('interest_rate_spread_low', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Margin high rate"
          {...register('interest_rate_spread_high', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Loan to Value"
          {...register('loan_to_value_percentage', {required: true})}
        />
        <Input
          type="text"
          placeholder="Number of months"
          label="PITI Reserve Months"
          {...register('piti_reserve_months', {required: true})}
        />
      </div>
      <div
        css={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          '&>*': {
            width: '100%',
            maxWidth: '350px',
          },
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <CurrencyInput
            control={control}
            labelStyles={{
              marginBottom: '1.9rem',
            }}
            type="text"
            placeholder="$"
            label="Estimated Appraisal Cost"
            {...register('estimated_appraisal_cost', {required: false})}
          />
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <label
            css={{
              fontWeight: '300',
              fontSize: '20px',
              lineHeight: '26px',
              marginBottom: '0.5rem',
            }}
          >
            Estimated Closing Date
          </label>
          <DatePicker
            name="estimated_closing_date"
            placeholder="Estimated Closing Date"
            control={control}
          />
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <label
            css={{
              fontWeight: '300',
              fontSize: '20px',
              lineHeight: '26px',
              marginBottom: '0.5rem',
            }}
          >
            Estimated Appraisal Delivery Date
          </label>
          <DatePicker
            name="estimated_appraisal_delivery_date"
            placeholder="Estimated Appraisal Delivery Date"
            control={control}
          />
        </div>
      </div>
      <p
        css={{
          fontSize: '14px',
          width: '30%',
          margin: '10px 0 0 0',
          padding: '0',
        }}
      >
        Note: When setting the estimated closing date or appraisal delivery
        date, the estimated appraisal cost is also required
      </p>
    </form>
  )
}
