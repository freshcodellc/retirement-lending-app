/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {Button} from '@solera/ui'
import {Layout, StepTracker} from 'components'
import {useUpdateApplication} from 'hooks/use-update-application'

const stepRoute = (uuid, step) => `/application/${uuid}/prescreen/${step}`

function TermsSheetScreen() {
  const navigate = useNavigate()
  const {mutate: saveEdit, isLoading: isSaving} = useUpdateApplication()
  const {register, handleSubmit, formState} = useForm({
    mode: 'onChange',
  })

  const handleSave = handleSubmit(form => saveEdit({...form}))

  return (
    <Fragment>
      <StepTracker currentStep={1} maxStep={2} />
      <Layout>
        <h2 css={{marginBottom: '3rem'}}>address here</h2>
        <div>
          <h3>Proposal for Financing:</h3>
          <p>Dear Jane,</p>
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
          <h3>Borrower(s): Jane Doe</h3>
          <h3>Loan Amount: $500,00</h3>
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
        <form
          name="prescreen"
          onSubmit={handleSave}
          css={{
            marginBottom: '3rem',
            '& > *': {
              marginTop: '65px',
            },
          }}
        >
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
