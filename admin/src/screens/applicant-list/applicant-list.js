/** @jsxImportSource @emotion/react */
import * as React from 'react'

import {FiltersPanel} from './filters-panel'
import {ApplicantTable} from './applicant-table'

export default function ApplicantList() {
  const [filters, setFilters] = React.useState()

  return (
    <div>
      <h1>Applicant List</h1>
      <FiltersPanel setFilters={setFilters} />
      <ApplicantTable filters={filters} />
    </div>
  )
}
