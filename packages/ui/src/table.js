/** @jsx jsx */
import styled from '@emotion/styled/macro'
import * as colors from './styles/colors'

const TableWrapper = styled.div({
  display: 'block',
  width: '100%',
  overflowX: 'auto'
})

const Table = styled.table({
  width: '100%',
  maxWidth: '100%',
  borderCollapse: 'collapse'
})

const Th = styled.th({
  verticalAlign: 'middle',
  textAlign: 'left',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  fontWeight: 500,
  fontSize: '20px'
})

const Tr = styled.tr({
  '&:nth-of-type(even)': {
    backgroundColor: colors.gray10
  }
})

const Td = styled.td({
  verticalAlign: 'middle',
  padding: '1rem',
  lineHeight: '1.5'
})

export { TableWrapper, Table, Th, Tr, Td }
