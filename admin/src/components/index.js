import styled from '@emotion/styled/macro'

import {colors} from '@solera/ui'

export const FormMessage = styled.p(
  {
    fontWeight: 500,
    fontSize: '1rem',
  },
  ({variant = 'normal'}) => ({
    color: {normal: colors.text, error: colors.danger, success: colors.green}[
      variant
    ],
  }),
)

export const AuthForm = styled.form({
  width: '100%',
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  '& > div': {
    marginTop: '60px',
  },
})

export * from './input'
export * from './modal'
export {default as ReturnLink} from './return-link'
export {default as StatusBadge} from './status-badge'
export {default as Header} from './header'
export {default as ErrorFallback} from './error-fallback'
