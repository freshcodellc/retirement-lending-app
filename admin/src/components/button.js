/** @jsxImportSource @emotion/react */

import {keyframes} from '@emotion/react'
import {FiLoader} from 'react-icons/fi'
import styled from '@emotion/styled/macro'
import {Button as UiButton} from '@solera/ui'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FiLoader)({
  animation: `${spin} 1s linear infinite`,
  marginRight: '4px',
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const Button = ({isLoading, children, ...props}) => (
  <UiButton isLoading={isLoading} disabled={isLoading} {...props}>
    <span
      css={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      {isLoading ? <Spinner /> : null}
      {children}
    </span>
  </UiButton>
)

export {Button}
