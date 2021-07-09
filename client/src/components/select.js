/** @jsxImportSource @emotion/react */
import {ConstantSelect} from '@solera/ui'
import {useConstants} from 'hooks/use-constants'
import {useWatch} from 'react-hook-form'

function NetWorthSelect(props) {
  const {netWorths} = useConstants()
  return <ConstantSelect options={netWorths} {...props} />
}

function EntitySelect({control, setValue, ...props}) {
  const {entityTypes} = useConstants()
  const planType = useWatch({control, name: 'plan_type'})

  const entities = entityTypes.filter(e => e.name.includes(planType))

  return <ConstantSelect options={entities} control={control} {...props} />
}

function PropertySelect(props) {
  const {propertyTypes} = useConstants()
  return <ConstantSelect options={propertyTypes} {...props} />
}

export {NetWorthSelect, EntitySelect, PropertySelect}
