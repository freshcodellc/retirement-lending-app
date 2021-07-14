/** @jsxImportSource @emotion/react */
import {colors} from '@solera/ui'

function StepTracker({currentStep, maxStep}) {
  const full = 300
  const progress = (currentStep / maxStep) * full

  return (
    <div
      css={{
        color: 'white',
        position: 'sticky',
        background: colors.tertiary,
        top: 'calc(var(--header-height)*1px)',
      }}
    >
      <div
        css={{
          display: 'flex',
          padding: '1rem',
          margin: '0 auto',
          alignItems: 'center',
          maxWidth: 'calc(var(--grid-base-width)*1px)',
        }}
      >
        <span>{`Step ${currentStep} of ${maxStep}`}</span>
        <div
          css={{
            height: '5px',
            width: '100%',
            maxWidth:  `${full}px`,
            marginLeft: '6rem',
            background: 'white',
            borderRadius: '50px',
            position: 'relative',
            '&:after': {
              content: '""',
              top: '0',
              left: '0',
              height: '5px',
              position: 'absolute',
              borderRadius: '50px',
              width: `${progress}px`,
              backgroundColor: `${colors.primary}`,
            },
          }}
        ></div>
      </div>
    </div>
  )
}

export {StepTracker}
