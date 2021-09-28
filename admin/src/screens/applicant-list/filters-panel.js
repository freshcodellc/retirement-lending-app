/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useForm} from 'react-hook-form'

import {colors, Button, Checkbox, SearchInput} from '@solera/ui'
import {StatusSelect, DateRangePicker} from 'components'
import {useConstants} from 'hooks/use-constants'

export function FiltersPanel({setFilters}) {
  const {register, handleSubmit, reset, formState, control} = useForm()

  const handleFilter = handleSubmit(setFilters)

  const clearFilters = e => {
    e.preventDefault()
    reset()
  }

  const {statuses} = useConstants()

  return (
    <React.Fragment>
      <form
        name="filters"
        onSubmit={handleFilter}
        css={{
          gap: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          padding: '2rem',
          marginBottom: '2rem',
          alignItems: 'flex-end',
          border: `5px solid ${colors.gray40}`,
          '&>div': {
            width: '100%',
            minWidth: '200px',
            maxWidth: 'calc((100% - 6rem)/4)',
          },
        }}
      >
        <div>
          <SearchInput
            id="search_query"
            name="search_query"
            placeholder="Search"
            {...register('search_query')}
          />
          <DateRangePicker
            start_name="date_start"
            end_name="date_end"
            control={control}
            placeholder="mm/dd/yy"
            label="Application date"
            css={{marginTop: '2rem'}}
          />
        </div>
        <div>
          <StatusSelect
            id="status"
            options={statuses}
            name="status"
            control={control}
            label="Application status"
          />
        </div>
        <div>
          <Checkbox
            variant="primary"
            control={control}
            label="Assigned to me"
            id="only_assigned_to_me"
            name="only_assigned_to_me"
          />
        </div>
        <div>
          <Button
            type="submit"
            css={{marginBottom: '2rem'}}
            disabled={!formState.isDirty}
          >
            Filter applicants
          </Button>
          <Button disabled={!formState.isDirty} onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}
