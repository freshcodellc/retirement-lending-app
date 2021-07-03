/** @jsxImportSource @emotion/react */
import {ConstantSelect} from '@solera/ui'
import {useConstants} from 'hooks/use-constants'

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

export {NetWorthSelect, EntitySelect, PropertySelect}
