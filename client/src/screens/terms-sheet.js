/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {Button, Input} from '@solera/ui'
import {Layout, StepTracker} from 'components'
import {useUpdateApplication} from 'hooks/use-update-application'
import {useTermsSheet} from 'hooks/use-terms-sheet'
import currency from 'currency.js'
import {format} from 'date-fns'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  signature: yup.string().required('Required'),
  signature_title: yup.string().required('Required'),
  signature_entity_name: yup.string().min(8).required('Required'),
})

function TermsSheetScreen() {
  const navigate = useNavigate()
  const {data, isLoading, defaultValues} = useTermsSheet()
  const {mutate: saveSignature, isLoading: isSaving} = useUpdateApplication({
    onSuccess() {
      navigate('/', {replace: true})
    },
  })
  const {register, handleSubmit, formState} = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const signedDate = format(new Date(), `do 'day of' MMMM, yyyy`)
  const loanAmount = currency(data.requested_loan_amount, {
    fromCents: true,
  }).format()
  const {address, address_2, city, state, postal_code} = data.addresses.find(
    a => a.type === 'property',
  )
  const {first_name = 'admin_first', last_name = 'admin_last'} =
    data.assigned_admin

  const handleSave = handleSubmit(form => {
    const signature_date = new Date().toISOString()
    saveSignature({signature_date, uuid: data.uuid, ...form})
  })

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <Fragment>
      <StepTracker currentStep={1} maxStep={1} />
      <Layout>
        <h2 css={{margin: 0}}>{data.entity_name}</h2>
        <h2 css={{margin: 0}}>
          {data.first_name} {data.last_name}
        </h2>
        <h2 css={{margin: 0}}>
          {address} {address_2}
        </h2>
        <h2 css={{marginTop: 0, marginBottom: '4rem'}}>
          {city}, {state} {postal_code}
        </h2>

        <div>
          <h3>Proposal for Financing:</h3>
          <p>Dear {data.first_name},</p>
          <p>
            Solera National Bank is pleased to provide to you the following
            proposal for financing. This letter contains the primary terms under
            which we propose to consider the extension of credit. The
            information below is based on preliminary discussions between you
            and the Bank and is designed to clarify how we will proceed with
            final consideration of your request.{' '}
            <span css={{textDecoration: 'underline'}}>
              This letter is not a commitment to lend under these or any other
              terms and conditions. All terms noted below are subject to
              approval by the Bank as part of its underwriting and approval
              process.
            </span>
          </p>
        </div>
        <div>
          <h3>
            Borrower(s): {data.first_name} {data.last_name}
          </h3>
          <h3>Loan Amount: {loanAmount}</h3>
        </div>
        <div>
          <h3>Interest Rate:</h3>
          <p>
            TBD – The rate at closing will be fixed for the first seven years of
            the loan term. This rate, if the loan were closed today, would
            likely be between 5.15-5.35 %. This rate may vary depending on the
            actual timing of closing. At the seventh anniversary and annually
            thereafter, the rate will adjust to the then-current One-Year
            Treasury Constant Maturity Plus a margin of between 4.65 and 4.85%,
            adjusting annually thereafter for the remaining term of the loan.
            Interest rates will not adjust, up or down, by more than 2.0% at
            each annual rate adjustment, and by no more than a cumulative 6.0%
            over the life of the loan. The minimum rate to be charged will not
            be below 4.50% and the maximum rate charged will not exceed the
            initial rate plus 6.0%.
          </p>
        </div>
        <div>
          <h3>Origination Fee:</h3>
          <p>1.50% of loan amount</p>
        </div>
        <div>
          <h3>Repayment Terms:</h3>
          <p>
            Monthly payments of principal and interest based on a 25 year
            amortization. Payments will be re-amortized at each rate change.
            Property taxes and Property Insurance costs will also be escrowed
            each month.
          </p>
        </div>
        <div>
          <h3>Maturity:</h3>
          <p>25 years from closing</p>
        </div>
        <div>
          <h3>Collateral:</h3>
          <p>
            1 st Deed of Trust and Assignment of Rents (or equivalent) on
            property commonly known as ____________________
          </p>
          <p>
            The maximum Loan amount will be restricted to 60% of the lesser of
            the purchase price or appraised value.
          </p>
        </div>
        <div>
          <h3>Prepayment:</h3>
          <p>The loan may be prepaid at any time without penalty.</p>
        </div>
        <div>
          <h3>Reserve Account:</h3>
          <p>
            The borrower is required to maintain a reserve account at Solera
            National Bank with a collected balance of not less than SIX (6)
            months of PITI plus Property Management Fee payments. Failure to
            maintain balances may result in the imposition of fees.
          </p>
        </div>
        <div>
          <h3>Operating Account:</h3>
          <p>
            The borrower is required to maintain the operating account for the
            property with Solera National Bank.
          </p>
        </div>
        <div>
          <h3>Other Fees and Costs:</h3>
          <p>
            <span css={{textDecoration: 'underline'}}>Appraisal</span> – The
            Borrower is responsible for the cost of a required appraisal and
            appraisal review. If an appraisal is required, the Bank will collect
            the appropriate appraisal fees from the Borrower prior to ordering
            the appraisal.
          </p>
          <p>
            <span css={{textDecoration: 'underline'}}>
              Environmental Review
            </span>{' '}
            – In rare instances, an environmental review is required for a
            property. The Borrower is responsible for any costs associated with
            necessary and required environmental assessment and review reports.
            Fees are collected at the time the report is ordered.
          </p>
          <p>
            <span css={{textDecoration: 'underline'}}>
              Loan documentation preparation
            </span>{' '}
            – The Borrower is responsible for all loan document preparation
            fees.
          </p>
          <p>
            <span css={{textDecoration: 'underline'}}>Title Fees</span> – The
            borrower is responsible for the cost of Title Insurance,
            Endorsements, loan closing fees and recording fees.
          </p>
          <p>
            <span css={{textDecoration: 'underline'}}>
              Flood Insurance Report
            </span>{' '}
            – The Borrower is responsible for the cost of required flood
            insurance certification.
          </p>
          <p>
            <span css={{textDecoration: 'underline'}}>Other Costs</span> – The
            Borrower is responsible for all other costs of the loan, including
            but not limited to flood certification, future release fees, UCC
            financing statement recordation fees, legal fees as necessary or
            required, and all other costs associated with the loan transactions.
          </p>
          <p>
            In order for the Bank to begin underwriting the above proposal, we
            need you to provide all of the information and documentation noted
            below. We would prefer that this information be provided in
            electronic form but are also happy to accept hard copies. If you
            would like to provide the information electronically, you may, but
            are not required to use our secure file transfer system provided by
            Leapfile. Instructions for this are attached to this letter.
          </p>
        </div>
        <div>
          <h3>Requirements Precedent to Underwriting:</h3>
          <p>
            The following documents, information or actions must be provided to
            the Bank in order for us to complete the underwriting and
            consideration of final approval of your request. The terms contained
            in this letter are subject to the review and approval of the
            Requirements Precedent to Closing:
          </p>
          <p>
            If an IRA is the borrower, copies of formation documents for the IRA
            including proof of EIN/TIN and notation of the custodian, including
            contact information.
          </p>
          <p>
            If a 401k is the Borrower, copies of trust documents establishing
            the 401k including proof of the EIN/TIN for the 401k and
            identification of the trustee together with contact information.{' '}
          </p>
          <p>
            Copies of the formation documents (Operating Agreement and Articles
            of Organization) for the LLC that will be purchasing the property
            within the IRA or 401k if applicable, including EIN/TIN number and
            contact information.
          </p>
          <p>Copies of purchase contract if this is an acquisition.</p>
          <p>Copies of any existing or proposed leases for the property.</p>
          <p>
            Copies of any historic financial information for the property if
            available.{' '}
          </p>
          <p>Title commitment for the property to be purchased if available.</p>
          <p>
            Legal description and common address for the property, together with
            contact information for the person who can provide access for
            appraisal and inspection.
          </p>
          <p>
            Copies of any insurance policies covering the property (if an
            existing refinance) or contact information for insurance carrier if
            a new purchase.{' '}
          </p>
          <p>
            Current IRA or 401k account statements showing sufficient liquid
            balances to complete the proposed acquisition.
          </p>
        </div>
        <div>
          <p css={{fontWeight: 600}}>
            Note: The Bank cannot guaranty completion of underwriting if you
            fail to provide the required information or satisfy any other
            condition. Other changes to the loan that are requested by the
            Borrower outside of the terms specified in this proposal letter may
            also result in delays to loan closings. Please advise us immediately
            if any of the above requirements (as applicable) will be difficult
            to meet.{' '}
          </p>
          <p css={{fontWeight: 600}}>
            The terms contained within this Proposal for Financing are subject
            to receipt of all required information confirming the data that was
            provided by you to assist us in providing this proposal. The
            proposal itself will remain effective for thirty (30) days from the
            date of this letter.{' '}
          </p>
          <p css={{fontWeight: 600, textDecoration: 'underline'}}>
            As previously stated, this letter is a proposal for financing and
            does not represent a commitment to lend under these or any other
            terms.{' '}
          </p>
          <p>
            Solera National Bank appreciates the opportunity to provide you with
            this proposal for financing. If you find the terms and conditions
            acceptable, please indicate your concurrence by signing a copy and
            returning it to this office together with the required information
            and your check. An emailed copy of the signed letter is sufficient
            if the original is then delivered to the Bank.
          </p>
        </div>
        <div css={{marginBottom: '3rem'}}>
          <p css={{fontWeight: 600}}>Sincerely,</p>
          <p>who's signature goes here?</p>
        </div>
        <div>
          <p>
            Name:{' '}
            <span css={{fontWeight: 600}}>
              {first_name} {last_name}
            </span>
          </p>
          <p>
            Title: <span css={{fontWeight: 600}}>title?</span>
          </p>
        </div>
        <div>
          <h3>Acceptance of Proposal for Financing:</h3>
          <p>
            The undersigned hereby accepts the above Proposal for Financing,
            confirms that this is a proposal and not a commitment to lend under
            these or any other terms, and requests that the Bank begin
            underwriting the request upon Bank’s receipt of requested documents
            and information noted in this proposal, this {signedDate}.
          </p>
        </div>
        <form
          name="prescreen"
          onSubmit={handleSave}
          css={{
            marginBottom: '3rem',
            '& > *': {
              marginTop: '50px',
            },
          }}
        >
          <Input
            label="Borrower"
            placeholder="Borrower"
            name="signature"
            {...register('signature')}
          />
          <Input
            label="By"
            placeholder="By"
            name="signature_title"
            {...register('signature_title')}
          />
          <Input
            label="Name"
            placeholder="Name"
            name="signature_entity_name"
            {...register('signature_entity_name')}
          />
          <p>Name: name?</p>
          <div css={{textAlign: 'center'}}>
            <Button
              type="submit"
              isLoading={isSaving}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </div>
        </form>
      </Layout>
    </Fragment>
  )
}

export {TermsSheetScreen}
