/** @jsxImportSource @emotion/react */
import {useAdmins} from 'hooks/use-admins'
import {join, initial} from 'utils/format'
import {
  Select,
  FormControl,
  SelectOption,
  SelctEmptyOption,
  ConstantSelect,
  StatusSelect as UiStatusSelect,
} from '@solera/ui'
import {useConstants} from 'hooks/use-constants'

function AdminSelect({className, ...props}) {
  const {admins} = useAdmins()
  const profiles = admins.filter(admin => admin.profile)

  return (
    <FormControl className={className}>
      <Select {...props}>
        <SelctEmptyOption css={{padding: '0.5rem'}}>
          Select admin
        </SelctEmptyOption>
        {profiles.map(admin => (
          <SelectOption
            key={admin.uuid}
            value={admin.uuid}
            css={{padding: '0.5rem'}}
          >
            {join(admin.profile.first_name, initial(admin.profile.last_name))}
          </SelectOption>
        ))}
      </Select>
    </FormControl>
  )
}

function NetWorthSelect(props) {
  const {netWorths} = useConstants()
  return <ConstantSelect options={netWorths} {...props} />
}

function EntitySelect({planType, ...props}) {
  const {entityTypes} = useConstants()
  const matchBy = planType === 'IRA' ? planType : '401'
  const types = entityTypes.filter(e => e.name.includes(matchBy))

  return <ConstantSelect options={types} {...props} />
}

function PropertySelect(props) {
  const {propertyTypes} = useConstants()
  return <ConstantSelect options={propertyTypes} {...props} />
}

function StatusSelect(props) {
  const {statuses} = useConstants()
  return <UiStatusSelect options={statuses} {...props} />
}

export {NetWorthSelect, EntitySelect, PropertySelect, AdminSelect, StatusSelect}
