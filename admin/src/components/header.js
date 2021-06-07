/** @jsxImportSource @emotion/react */
import {Link} from 'react-router-dom'
import {colors} from '@solera/ui'
import {ReactComponent as Logo} from 'assets/logo.svg'


export default function Header({children}) {
  return (
    <nav
      css={{
        width: '100%',
        height: 'calc(var(--header-height)*1px)',
        padding: '1rem calc(var(--grid-margin-width)*1px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: colors.base,
        backgroundColor: colors.primary,
      }}
    >
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {children}
    </nav>
  )
}
