/** @jsxImportSource @emotion/react */
import {
  Button,
  FormControl,
  InputAdornment,
  Input,
  Select,
  SelectOption,
  colors,
} from '@solera/ui'
import {FiSearch, FiCalendar} from 'react-icons/fi'

export default function Applicants() {
  return (
    <div>
      <div>
        <h1>Applicant List</h1>
        <div
          css={{
            padding: '2rem',
            border: `5px solid ${colors.gray20}`,
          }}
        >
          <FormControl>
            <InputAdornment>
              <FiSearch color={colors.gray80} />
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
              <FiCalendar size="1.5em" color={colors.gray80} />
            </InputAdornment>
          </FormControl>
          <Select
            label="Application status"
            id="apps-status"
            name="apps-status"
            css={{marginBottom: '3rem'}}
          >
            <SelectOption value="role1">role 1</SelectOption>
            <SelectOption value="role2">role 2</SelectOption>
          </Select>
          <Button>Update list</Button>
          <Button>Clear</Button>
        </div>
      </div>
    </div>
  )
}
