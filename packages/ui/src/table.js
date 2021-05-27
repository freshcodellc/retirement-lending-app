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
  borderSpacing: 0
})

const Th = styled.th({
  verticalAlign: 'middle',
  textAlign: 'left',
  paddingLeft: '2.5rem',
  paddingRight: '2.5rem'
})

const Tr = styled.tr({
  '&:nth-child(even)': {
    backgroundColor: colors.gray10
  }
})

const Td = styled.td({
  verticalAlign: 'middle',
  padding: '1rem 2.5rem',
  lineHeight: '1.5'
})

export { TableWrapper, Table, Th, Tr, Td }
