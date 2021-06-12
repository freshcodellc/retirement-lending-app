/** @jsxImportSource @emotion/react */
import {useController} from 'react-hook-form'

import {useAdmins} from 'hooks/use-admins'
import {joinNames, initialName} from 'utils/user'
import {
  FormControl,
  Select as UiSelect,
  SelectOption,
  SelctEmptyOption,
} from '@solera/ui'

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
            {joinNames(admin.first_name, initialName(admin.last_name))}
          </SelectOption>
        ))}
      </Select>
    </FormControl>
  )
}

export {Select, SelectOption, SelctEmptyOption, AdminSelect}
