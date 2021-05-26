/** @jsxImportSource @emotion/react */
import {Button} from '@solera/ui'
export default function Admin() {
  return (
    <div>
      <div css={{
        textAlign: 'center',
      }}>
        <h1>Admin</h1>
        <Button variant="secondary" css={{ width: '300px'}}>invite new admin</Button>
      </div>
    </div>
  )
}
