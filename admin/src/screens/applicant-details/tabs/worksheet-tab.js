/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import currency from 'currency.js'
import toast from 'react-hot-toast'
import {FaRegCopy} from 'react-icons/fa'

export function WorksheetFieldsTab({application}) {
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
