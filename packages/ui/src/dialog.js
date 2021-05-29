/** @jsx jsx */
import styled from '@emotion/styled/macro'
import { Dialog as ReachDialog } from '@reach/dialog'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'

import '@reach/dialog/styles.css'

const Dialog = styled(ReachDialog)({
  borderRadius: 0,
  border: `5px solid ${colors.gray40}`,
  boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.2)`,
  margin: '10vh auto 0',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto'
  }
})

export { Dialog }
