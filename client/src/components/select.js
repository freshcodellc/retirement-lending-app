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
  const {control, setValue, finalProps} = props
  const {entityTypes} = useConstants()
  const planType = useWatch({control, name: 'plan_type'})

  const entities = entityTypes.filter(e => e.name.includes(planType))

  return <ConstantSelect options={entities} control={control} {...finalProps} />
})

function PropertySelect(props) {
  const {propertyTypes} = useConstants()
  return <ConstantSelect options={propertyTypes} {...props} />
}

export {NetWorthSelect, EntitySelect, PropertySelect}
