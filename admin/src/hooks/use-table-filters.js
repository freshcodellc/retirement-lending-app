import {useMemo} from 'react'
import {matchSorter} from 'match-sorter'

function useTableFilters() {
  const filterTypes = useMemo(filterTypesFn, [])

  return {
    filterTypes,
  }
}

function filterTypesFn() {
  return {
    fuzzyText: fuzzyTextFilterFn,
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true
      })
    },
  }
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}
fuzzyTextFilterFn.autoRemove = val => !val

export {useTableFilters}
