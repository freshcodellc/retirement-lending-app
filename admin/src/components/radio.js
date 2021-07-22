import {forwardRef} from 'react'
import {useConstants} from 'hooks/use-constants'
import {RadioGroup, RadioInput} from '@solera/ui'

const PlanRadio = forwardRef(({name, label, ...props}, ref) => {
  const {planTypes} = useConstants()

  return (
    <RadioGroup text={label}>
      {planTypes.map(plan => (
        <RadioInput
          {...props}
          name={name}
          value={plan.name}
          label={plan.humanized}
          key={plan.humanized}
          id={plan.humanized}
          ref={ref}
        />
      ))}
    </RadioGroup>
  )
})

export {PlanRadio}
