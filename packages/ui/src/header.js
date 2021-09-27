/** @jsx jsx */
import { jsx } from '@emotion/react'
import { ReactComponent as Logo } from './assets/logo.svg'
import * as colors from './styles/colors'

const Header = ({ children, onLogoClick }) => (
  <header
    css={{
      top: 0,
      zIndex: 2,
      width: '100%',
      position: 'sticky'
    }}
  >
    <nav
      css={{
        display: 'flex',
        color: colors.base,
        alignItems: 'center',
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
        height: 'calc(var(--header-height)*1px)',
        padding: '0 calc(var(--grid-margin-width)*1px)'
      }}
    >
      <Logo onClick={onLogoClick} css={{ cursor: 'pointer' }} />
      {children}
    </nav>
  </header>
)

export { Header }
