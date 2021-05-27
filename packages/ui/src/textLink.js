/** @jsx jsx */
import styled from '@emotion/styled/macro'
import * as colors from './styles/colors'

const variants = {
  primary: {
    color: colors.primary
  },
  secondary: {
    color: colors.secondary
  }
}

const TextLink = styled.span(
  {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  ({ variant = 'primary' }) => variants[variant]
)

export { TextLink }
