/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {
  Button,
  FormControl,
  InputAdornment,
  Input,
  Select,
  SelectOption,
  colors,
  Checkbox,
} from '@solera/ui'
import {FiSearch, FiCalendar} from 'react-icons/fi'

export default function Applicants() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div>
      <div>
        <h1>Applicant List</h1>
        <div
          css={{
            padding: '2.5rem',
            border: `5px solid ${colors.gray40}`,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            gap: '2.5rem',
            '&>div': {
              maxWidth: 'calc((100% - 7.5rem)/4)',
              minWidth: '200px',
              width: '100%'
            },
          }}
        >
          <div>
            <FormControl css={{marginBottom: '2rem'}}>
              <InputAdornment>
                <FiSearch />
              </InputAdornment>
              <Input
                type="search"
                name="apps-search"
                placeholder="Search"
                css={{padding: '0.5rem', paddingLeft: '20px'}}
              />
            </FormControl>
            <FormControl>
              <Input
                type="search"
                name="apps-date"
                placeholder="mm/dd/yy"
                label="Application date"
                css={{padding: '0.5rem', paddingRight: '20px'}}
              />
              <InputAdornment end>
                <FiCalendar size="1.4em" />
              </InputAdornment>
            </FormControl>
          </div>
          <div>
            <Select
              label="Application status"
              id="apps-status"
              name="apps-status"
            >
              <SelectOption value="status1">status 1</SelectOption>
              <SelectOption value="status2">status 2</SelectOption>
            </Select>
          </div>
          <div>
            <label
              css={{fontSize: '1.2rem', display: 'flex', alignItems: 'center'}}
            >
              <Checkbox
                checked={checked}
                name="assigned-to-me"
                onChange={event => setChecked(event.target.checked)}
              />
              Assinged to me
            </label>
          </div>
          <div>
            <Button css={{marginBottom: '2rem'}}>Update list</Button>
            <Button>Clear</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
