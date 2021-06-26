import {forwardRef} from 'react'
import {useController} from 'react-hook-form'

import {Checkbox as UiCheckbox} from '@solera/ui'

const Checkbox = forwardRef(({control, name, rules, ...props}, ref) => {
  const {
    field: {onChange, value},
  } = useController({
    name,
    control,
    rules,
  })
  return (
    <UiCheckbox
      ref={ref}
      id={name}
      name={name}
      checked={value}
      onChange={onChange}
      {...props}
    />
  )
})

export {Checkbox}
