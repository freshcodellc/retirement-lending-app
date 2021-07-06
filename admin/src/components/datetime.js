/** @jsxImportSource @emotion/react */
import {parseISO} from 'date-fns'
import {FiCalendar} from 'react-icons/fi'
import {useController} from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'

import {Input, FormControl, InputAdornment} from '@solera/ui'

import '../styles/react-datepicker.css'

const DateRangePicker = ({
  control,
  start_name,
  end_name,
  rules,
  className,
  placeholder,
  ...props
}) => {
  const {
    field: {onChange: onStartChnage, value: startDate},
  } = useController({
    rules,
    control,
    name: start_name,
  })
  const {
    field: {onChange: onEndChange, value: endDate},
  } = useController({
    rules,
    control,
    name: end_name,
  })

  const onDateChange = ([start, end]) => {
    onStartChnage(start)
    onEndChange(end)
  }

  return (
    <FormControl className={className}>
      <ReactDatePicker
        selectsRange
        endDate={endDate}
        startDate={startDate}
        onChange={onDateChange}
        placeholderText={placeholder}
        closeOnScroll={e => e.target === document}
        customInput={
          <Input
            type="text"
            id="date_range"
            name="date_range"
            css={{paddingRight: '20px'}}
            {...props}
          />
        }
      />
      <InputAdornment end>
        <FiCalendar size="1.4em" />
      </InputAdornment>
    </FormControl>
  )
}

const DatePicker = ({
  control,
  date,
  name,
  rules,
  className,
  placeholder,
  ...props
}) => {
  const {
    field: {onChange, value, ref},
  } = useController({rules, control, name})

  const onDateChange = date => {
    onChange(date)
  }
  const typeDate = typeof value === 'string' ? parseISO(value) : value

  return (
    <FormControl className={className}>
      <ReactDatePicker
        selected={typeDate}
        onChange={onDateChange}
        placeholderText={placeholder}
        closeOnScroll={e => e.target === document}
        customInput={
          <Input
            ref={ref}
            id={name}
            name={name}
            css={{paddingRight: '20px'}}
            {...props}
            type="text"
          />
        }
      />
      <InputAdornment end>
        <FiCalendar size="1.4em" />
      </InputAdornment>
    </FormControl>
  )
}

export {DateRangePicker, DatePicker}
