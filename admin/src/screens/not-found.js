/** @jsxImportSource @emotion/react */
import {Link} from 'react-router-dom'

import {TextLink} from '@solera/ui'
export default function NotFound() {
  return (
    <>
      <p>Sorry... nothing here!</p>
      <Link to="/">
        <TextLink>Return to Login page</TextLink>
      </Link>
    </>
  )
}
