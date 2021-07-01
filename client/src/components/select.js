/** @jsxImportSource @emotion/react */
import {ConstantSelect} from '@solera/ui'
import {useConstants} from 'hooks/useConstants'

function NetWorthSelect(props) {
  const {netWorths} = useConstants()
  return <ConstantSelect options={netWorths} {...props} />
}

function EntitySelect(props) {
  const {entityTypes} = useConstants()
  return <ConstantSelect options={entityTypes} {...props} />
}

function PropertySelect(props) {
  const {propertyTypes} = useConstants()
  return <ConstantSelect options={propertyTypes} {...props} />
}

export {NetWorthSelect, EntitySelect, PropertySelect}
