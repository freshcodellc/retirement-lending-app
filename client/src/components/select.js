/** @jsxImportSource @emotion/react */
import React from 'react'
import {ConstantSelect} from '@solera/ui'
import {useConstants} from 'hooks/use-constants'
import {useWatch} from 'react-hook-form'

const NetWorthSelect = React.forwardRef((props, ref) => {
  const {setValue, ...finalProps} = props
  const {netWorths} = useConstants()

  return <ConstantSelect options={netWorths} {...finalProps} />
})

const EntitySelect = React.forwardRef((props, ref) => {
  const {control, ...finalProps} = props
  const {entityTypes} = useConstants()
  const planType = useWatch({control, name: 'plan_type'})
  const entities = entityTypes.filter(e => e.name.includes(planType))

  return <ConstantSelect options={entities} control={control} {...finalProps} />
})

function PropertySelect(props) {
  const {propertyTypes} = useConstants()
  return <ConstantSelect options={propertyTypes} {...props} />
}
//TODO: does this need to be a constants from the backend??
function ClosingDeliverySelect(props) {
  const options = [
    {
      name: 'Electronic Delivery',
      humanized: 'Electronic Delivery',
    },
  ]
  return <ConstantSelect options={options} {...props} />
}

export {NetWorthSelect, EntitySelect, PropertySelect, ClosingDeliverySelect}
