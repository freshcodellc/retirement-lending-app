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

function NetWorthsSelect(props) {
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

export {Select, SelectOption, SelctEmptyOption, AdminSelect, NetWorthsSelect}
