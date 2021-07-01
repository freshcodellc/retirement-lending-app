/** @jsxImportSource @emotion/react */
import {Button, colors} from '@solera/ui'
import {Link} from 'react-router-dom'
function ApplicationBox({data}) {
  return (
    <div
      css={{
        border: `2px solid ${colors.secondary}`,
      }}
    >
      <div
        css={{
          padding: `2rem 1rem`,
          borderBottom: `2px solid ${colors.secondary}`,
        }}
      >
        Application 1
      </div>
      <div css={{padding: '1rem'}}>
        <Link to={`/${data.uuid}`}>
          <Button variation="secondary">Continue Loan Process</Button>
        </Link>
      </div>
    </div>
  )
}

export {ApplicationBox}
