/** @jsxImportSource @emotion/react */
import {useController} from 'react-hook-form'

import {useAdmins} from 'hooks/use-admins'
import {join, initial} from 'utils/format'
import {
  FormControl,
  Select as UiSelect,
  SelectOption,
  SelctEmptyOption,
} from '@solera/ui'
import {useConstants} from 'hooks/use-constants'

function Select({name, rules, control, defaultValue = 'empty', ...props}) {
  if (rules?.required) {
    rules.validate = value => value !== 'empty'
  }

  const {
    field: {onChange, value = defaultValue},
  } = useController({name, control, rules, defaultValue})

  return <UiSelect value={value} onChange={onChange} {...props} />
}

function AdminSelect({className, ...props}) {
  const {admins} = useAdmins()

  return (
    <FormControl className={className}>
      <Select {...props}>
        <SelctEmptyOption css={{padding: '0.5rem'}}>
          Select admin
        </SelctEmptyOption>
        {admins.map(admin => (
          <SelectOption
            key={admin.uuid}
            value={admin.uuid}
            css={{padding: '0.5rem'}}
          >
            {join(admin.first_name, initial(admin.last_name))}
          </SelectOption>
        ))}
      </Select>
    </FormControl>
  )
}

function NetWorthSelect(props) {
  const {netWorths} = useConstants()

  return (
    <Select {...props}>
      <SelctEmptyOption css={{padding: '0.55rem 0.5rem'}}>
        Select one
      </SelctEmptyOption>
      {netWorths.map(status => (
        <SelectOption key={status.name} value={status.name}>
          <span css={{display: 'flex', alignItems: 'center'}}>
            {status.humanized}
          </span>
        </SelectOption>
      ))}
    </Select>
  )
}

function EntitySelect(props) {
  const {entityTypes} = useConstants()

  return (
    <Select {...props}>
      <SelctEmptyOption css={{padding: '0.55rem 0.5rem'}}>
        Select one
      </SelctEmptyOption>
      {entityTypes.map(status => (
        <SelectOption key={status.name} value={status.name}>
          <span css={{display: 'flex', alignItems: 'center'}}>
            {status.humanized}
          </span>
        </SelectOption>
      ))}
    </Select>
  )
}

function PropertySelect(props) {
  const {propertyTypes} = useConstants()

  return (
    <Select {...props}>
      <SelctEmptyOption css={{padding: '0.55rem 0.5rem'}}>
        Select one
      </SelctEmptyOption>
      {propertyTypes.map(status => (
        <SelectOption key={status.name} value={status.name}>
          <span css={{display: 'flex', alignItems: 'center'}}>
            {status.humanized}
          </span>
        </SelectOption>
      ))}
    </Select>
  )
}

const states = getStates()
function UsStateSelect(props) {
  return (
    <Select {...props}>
      <SelctEmptyOption css={{padding: '0.55rem 0.5rem'}}>
        Select one
      </SelctEmptyOption>
      {states.map((state, i) => (
        <SelectOption key={state} value={state}>
          <span css={{display: 'flex', alignItems: 'center'}}>{state}</span>
        </SelectOption>
      ))}
    </Select>
  )
}

export {
  Select,
  SelectOption,
  SelctEmptyOption,
  AdminSelect,
  NetWorthSelect,
  EntitySelect,
  PropertySelect,
  UsStateSelect,
}

function getStates() {
  return [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ]
}
