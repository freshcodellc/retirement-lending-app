/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable} from 'react-table'
import {isValid, isSameDay, parseISO, format} from 'date-fns'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import currency from 'currency.js'
import {useForm} from 'react-hook-form'
import {Link, useParams} from 'react-router-dom'
import {FiPhone, FiSend, FiTrash2, FiEdit2} from 'react-icons/fi'
import {useQueryClient} from 'react-query'
import {useConstants} from 'hooks/use-constants'
import toast, {Toaster} from 'react-hot-toast'
import {FaRegCopy} from 'react-icons/fa'

import {
  Button,
  colors,
  DatePicker,
  FormMessage,
  Input,
  CurrencyInput,
  Tab,
  Table,
  TableWrapper,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Td,
  Textarea,
  TextLink,
  Th,
  Tr,
} from '@solera/ui'
import {join, initial, isoDate} from 'utils/format'
import {useAuth} from 'context/auth-context'
import {queryKeys} from 'utils/query-client'
import {useAddNote} from 'hooks/use-add-note'
import {useEditNote} from 'hooks/use-edit-note'
import {useRemoveNote} from 'hooks/use-remove-note'
import {useUpdateApplication} from 'hooks/use-update-application'
import {useApplication, useInfoSections} from 'hooks/use-application'
import {useChangeHistories} from 'hooks/use-change-histories'

import {ReturnLink, StatusSelect, AdminSelect} from 'components'

function snakeCaseToHumanized(field) {
  const parts = field.split('_')
  const capitalizedParts = parts.map(
    part => part.charAt(0).toUpperCase() + part.slice(1),
  )
  return capitalizedParts.join(' ')
}

export default function ApplicantDetails() {
  const {uuid} = useParams()
  const {application, isLoading, isError, error} = useApplication()
  const {changeHistories, changeHistoriesLoading} = useChangeHistories(uuid)
  const [activeTab, setActiveTab] = React.useState(0)

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <div>
      <h1>Applicant Details</h1>
      <ReturnLink to="/applicants" variant="secondary">
        Applicant List
      </ReturnLink>
      <ActionsPanel activeTab={activeTab} application={application} />
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>Applicant information</Tab>
          <Tab>Notes</Tab>
          <Tab>Communication history</Tab>
          <Tab>Change history</Tab>
          <Tab>Non-Recourse Worksheet Fields</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ApplicationInfo application={application} />
          </TabPanel>
          <TabPanel>
            <NotesTab application={application} />
          </TabPanel>
          <TabPanel>
            <CommHistoryTab application={application} />
          </TabPanel>
          <TabPanel>
            <ChangeHistoryTab
              changeHistories={changeHistories}
              application={application}
            />
          </TabPanel>
          <TabPanel>
            <WorksheetFields application={application} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Toaster />
    </div>
  )
}

function ActionsPanel({activeTab, application}) {
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
      estimated_appraisal_cost: rates.estimated_appraisal_cost * 100,
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
            maxWidth: '160px',
            minWidth: '160px',
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

function ApplicationInfo({application}) {
  const sections = useInfoSections(application)

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.2rem',
        '&>div': {
          height: '100%',
        },
      }}
    >
      {sections.map(section => (
        <div key={section.heading} css={{border: `1px solid ${colors.gray}`}}>
          <div
            css={{
              fontWeight: 500,
              fontSize: '20px',
              padding: '1.2rem',
              background: colors.gray,
              textTransform: 'capitalize',
            }}
          >
            {section.heading}
          </div>
          <div
            css={{
              padding: '1.2rem',
              position: 'relative',
              '& > *:not(:last-child)': {marginBottom: '1.2rem'},
            }}
          >
            {section.route ? (
              <Link to={`/applicants/${application.uuid}/${section.route}`}>
                <TextLink
                  variant="secondary"
                  css={{
                    right: '1.2rem',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    position: 'absolute',
                  }}
                >
                  Edit
                </TextLink>
              </Link>
            ) : null}
            {section.fields.map(field => (
              <div key={field.label}>
                <div css={{fontWeight: 600, marginBottom: '0.4rem'}}>
                  {field.label}
                </div>
                <div>{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div key="applicant files" css={{border: `1px solid ${colors.gray}`}}>
        <div
          css={{
            fontWeight: 500,
            fontSize: '20px',
            padding: '1.2rem',
            background: colors.gray,
          }}
        >
          Applicant Files
        </div>
        <div
          css={{
            padding: '1.2rem',
            position: 'relative',
            '& > *:not(:last-child)': {marginBottom: '1.2rem'},
          }}
        >
          {application.documents.map(document => {
            return (
              <div key={document.uuid}>
                <div css={{fontWeight: 600, marginBottom: '0.4rem'}}>
                  {snakeCaseToHumanized(document.document_type)}
                </div>
                <a href={document.presigned_url} target="blank">
                  {document.name}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function NotesTab({application}) {
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const [noteInEdit, setNoteInEdit] = React.useState()
  const {handleSubmit, register, formState, setValue, reset} = useForm({
    mode: 'onChange',
  })
  const {mutate: addNote, isLoading: adding} = useAddNote({
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
      reset()
    },
  })
  const {mutate: editNote} = useEditNote({
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
      reset()
      setNoteInEdit()
    },
  })
  const {mutate: removeNote} = useRemoveNote({
    onSettled() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
    },
  })

  const handleSaveNote = handleSubmit(({body}) => {
    if (noteInEdit) {
      editNote({uuid: noteInEdit, body})
    } else {
      addNote({body, loan_application_uuid: application.uuid})
    }
  })

  const handleEditNote =
    ({uuid, body}) =>
    () => {
      setNoteInEdit(uuid)
      setValue('body', body, {shouldValidate: true})
    }

  const handleRemoveNote = noteUuid => () => {
    removeNote(noteUuid)
  }

  return (
    <div
      css={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        '&>div': {
          width: '100%',
          minWidth: '300px',
          maxWidth: 'calc((100% - 1rem)/2)',
        },
      }}
    >
      <div css={{border: `1px solid ${colors.gray20}`}}>
        <form
          name="notes"
          onSubmit={handleSaveNote}
          css={{
            margin: 0,
            height: '100%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Textarea
            rows="21"
            id="body"
            name="body"
            placeholder="Start typing your note here..."
            {...register('body', {required: true})}
          />
          <Button
            type="submit"
            isLoading={adding}
            css={{margin: '1rem auto'}}
            disabled={!formState.isValid}
          >
            {noteInEdit ? 'Update' : 'Save'}
          </Button>
        </form>
      </div>
      <div
        css={{
          border: `1px solid ${colors.gray20}`,
          maxHeight: '500px',
          minHeight: '500px',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {(application.notes || []).map(note => {
          //TODO: check admin is preload form backend for this to work
          const {first_name, last_name, uuid} = note?.admin?.profile ?? {}
          const adminName = join(first_name, initial(last_name))
          const notedDate = isoDate(note.updated_at, 'MM.dd.yy')
          const yourNotes = user.uuid === uuid

          return (
            <div
              key={note.uuid}
              css={{
                margin: '1rem',
                padding: '1rem',
                border: `1px solid ${colors.text}`,
              }}
            >
              <div
                css={{
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>{`${notedDate}—${adminName}`}</div>
                {yourNotes ? (
                  <div css={{display: 'flex', gap: '1rem'}}>
                    <FiEdit2
                      onClick={handleEditNote(note)}
                      title="Edit your note"
                      css={{cursor: 'pointer'}}
                    />
                    <FiTrash2
                      onClick={handleRemoveNote(note.uuid)}
                      title="Remove your note"
                      css={{cursor: 'pointer'}}
                    />
                  </div>
                ) : null}
              </div>
              <p>{note.body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CommHistoryTab() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Sent by',
        accessor: 'sentBy',
      },
      {
        Header: 'Sent',
        accessor: 'sent',
        Cell({value: sentChannel}) {
          switch (sentChannel) {
            case 'email':
              return <FiSend />
            case 'phone':
              return <FiPhone />
            default:
              return sentChannel
          }
        },
      },
      {
        Header: 'Message type',
        accessor: 'messageType',
      },
    ],
    [],
  )
  const data = React.useMemo(
    () => [
      {
        date: '12.10.20',
        sentBy: 'John S.',
        sent: 'email',
        messageType: 'Terms link',
      },
      {
        date: '12.10.20',
        sentBy: 'John S.',
        sent: 'email',
        messageType: 'Full application',
      },
      {
        date: '12.10.20',
        sentBy: 'John S.',
        sent: 'phone',
        messageType: 'Full application',
      },
    ],
    [],
  )
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data})

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  css={{
                    paddingTop: '1.2rem',
                    paddingBottom: '1.2rem',
                    borderBottom: `3px solid ${colors.gray40}`,
                    '&:last-child': {
                      minWidth: '250px',
                    },
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

function ChangeHistoryTab({application, changeHistories}) {
  const interpolateValue = value => {
    let interpolated = ''

    switch (value) {
      case true:
        interpolated = 'true'
        break
      case false:
        interpolated = 'false'
        break
      case null:
        interpolated = 'blank'
      default:
        interpolated = value
    }

    return interpolated
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Changed by',
        accessor: 'changedBy',
      },
      {
        Header: 'What changed',
        accessor: 'changedFields',
      },
    ],
    [],
  )

  const data = changeHistories.map(changeHistory => ({
    date: format(
      new Date(parseISO(changeHistory.inserted_at)),
      "MM/dd/yyyy 'at' h:mm a",
    ),
    changedBy: `${changeHistory.user.profile.first_name} ${changeHistory.user.profile.last_name}`,
    changedFields: (
      <div key={changeHistory.uuid}>
        {Object.keys(changeHistory.changes).map((key, index) => (
          <div>
            <strong>{snakeCaseToHumanized(key)}</strong> was changed from{' '}
            <strong>{interpolateValue(changeHistory.changes[key][0])}</strong>{' '}
            to{' '}
            <strong>{interpolateValue(changeHistory.changes[key][1])}</strong>
          </div>
        ))}
      </div>
    ),
  }))
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data})

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  css={{
                    paddingTop: '1.2rem',
                    paddingBottom: '1.2rem',
                    borderBottom: `3px solid ${colors.gray40}`,
                    '&:last-child': {
                      minWidth: '250px',
                    },
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

function WorksheetFields({application}) {
  const [isCopied, setIsCopied] = React.useState(false)

  React.useEffect(() => {
    if (isCopied) {
      toast.success('Copied value to clipboard!')
      setIsCopied(false)
    }
  }, [isCopied])

  return (
    <>
      <div
        css={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          '&>div': {
            width: '100%',
            minWidth: '300px',
            maxWidth: 'calc((100% - 1rem)/2)',
          },
        }}
      >
        <div>
          <strong>Property value -</strong>{' '}
          {currency(application.estimated_value, {fromCents: true}).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.estimated_value, {
              fromCents: true,
            }).format({symbol: ''})}
          >
            <span>
              <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
            </span>
          </CopyToClipboard>
        </div>
        <div>
          <strong>Requested loan amount -</strong>{' '}
          {currency(application.requested_loan_amount, {
            fromCents: true,
          }).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.requested_loan_amount, {
              fromCents: true,
            }).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
        <div>
          <strong>Funding account balance -</strong>{' '}
          {currency(application.funding_account_balance, {
            fromCents: true,
          }).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.funding_account_balance, {
              fromCents: true,
            }).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
        <div>
          <strong>Monthly rent -</strong>{' '}
          {currency(application.monthly_current_rent, {
            fromCents: true,
          }).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.monthly_current_rent, {
              fromCents: true,
            }).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
        <div>
          <strong>Annual taxes -</strong>{' '}
          {currency(application.annual_taxes, {fromCents: true}).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.annual_taxes, {fromCents: true}).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
        <div>
          <strong>Annual insurance premium -</strong>{' '}
          {currency(application.annual_insurance_premium, {
            fromCents: true,
          }).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.annual_insurance_premium, {
              fromCents: true,
            }).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
        <div>
          <strong>Annual HOA fees -</strong>{' '}
          {currency(application.monthly_hoa_dues * 12, {
            fromCents: true,
          }).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.monthly_hoa_dues * 12, {
              fromCents: true,
            }).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
        <div>
          <strong>Anual property management fees -</strong>{' '}
          {currency(application.monthly_mgmt_fee * 12, {
            fromCents: true,
          }).format()}
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={currency(application.monthly_mgmt_fee * 12).format({
              symbol: '',
            })}
          >
            <FaRegCopy css={{marginLeft: '6px'}} size="15px" />
          </CopyToClipboard>
        </div>
      </div>
    </>
  )
}
