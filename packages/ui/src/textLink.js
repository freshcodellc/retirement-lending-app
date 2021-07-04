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
  ({ variant = 'primary', disabled = false }) => ({
    ...variants[variant],
    ...(disabled
      ? {
          color: colors.gray10,
          pointerEvents: 'none',
          '&:hover': { cursor: 'not-allowed' }
        }
      : {})
  })
)

export { TextLink }
