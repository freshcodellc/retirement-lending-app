/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom'
import {ReactComponent as SuccessIcon} from 'images/success.svg'
import {Button} from '@solera/ui'

function ThankYou({heading, subHeading}) {
  const navigate = useNavigate()

  const backToPortal = () => navigate('/', {replace: true})

  return (
    <div
      css={{
        display: 'flex',
        margin: '0 auto',
        textAlign: 'center',
        padding: '5rem 1rem',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: 'calc(var(--grid-base-width)*1px)',
      }}
    >
      <SuccessIcon css={{marginBottom: '8rem'}} />
      <h1>{heading}</h1>
      {subHeading && <p css={{marginBottom: '9rem'}}>{subHeading}</p>}
      <Button onClick={backToPortal}>Back to portal</Button>
    </div>
  )
}

export {ThankYou}
