/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate, Navigate} from 'react-router-dom'
import {Button, Input, PhoneInput} from '@solera/ui'
import {ThankYou, Layout, StepTracker, ClosingDeliverySelect} from 'components'
import {usePostApproval} from 'hooks/use-post-approval'
import {useUpdateApplication} from 'hooks/use-update-application'

const stepRoute = (uuid, step) => `/application/${uuid}/post-approval/${step}`

function PostApprovalScreen() {
  const navigate = useNavigate()
  const {
    uuid,
    fields,
    heading,
    resolver,
    isLoading,
    subHeading,
    defaultValues,
    isThankYouStep,
  } = usePostApproval()
  const {
    reset: resetSave,
    mutate: saveEdit,
    isLoading: isSaving,
    isError: saveIsError,
  } = useUpdateApplication({
    onSuccess() {
      resetSave()
      navigate(stepRoute(uuid, 2), {replace: true})
      window.scrollTo(0, 0)
    },
  })
  const {register, handleSubmit, control, formState} = useForm({
    resolver,
    defaultValues,
    mode: 'onChange',
  })

  const handleSave = handleSubmit(form => saveEdit({...form, uuid}))

  if (isLoading) {
    return 'Loading...'
  }

  if (!heading) {
    return <Navigate replace to="/" />
  }

  if (isThankYouStep) {
    return <ThankYou heading={heading} subHeading={subHeading} />
  }

  return (
    <Fragment>
      <StepTracker currentStep={1} maxStep={1} />
      <Layout>
        <div css={{textAlign: 'center'}}>
          <h1 css={{marginBottom: '3rem'}}>{heading}</h1>
          {subHeading && <p css={{margin: 0, fontWeight: 500}}>{subHeading}</p>}
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
          {fields.map(field => {
            let label = field.label

            const props = {
              ...field,
              label,
              key: field.name,
              hasError: saveIsError,
            }

            switch (field.type) {
              case 'h2':
                return (
                  <h2 css={{margin: '90px 0 0'}} key={field.text}>
                    {field.text}
                  </h2>
                )
              case 'text':
                return <Input {...props} {...register(field.name)} />
              case 'phone':
                return <PhoneInput control={control} {...props} />
              case 'email':
                return (
                  <Input
                    {...props}
                    {...register(field.name, {pattern: /^\S+@\S+$/i})}
                  />
                )
              case 'select':
                switch (field.name) {
                  case 'closing_delivery_preference':
                    return (
                      <ClosingDeliverySelect control={control} {...props} />
                    )
                  default:
                }
                break
              default:
            }
            return ''
          })}
          <div css={{display: 'flex', justifyContent: 'center'}}>
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

export {PostApprovalScreen}
