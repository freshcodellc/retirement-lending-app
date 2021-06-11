/** @jsxImportSource @emotion/react */
import {useState, forwardRef} from 'react'
import {IMaskMixin} from 'react-imask'
import {FiEye, FiEyeOff, FiSearch, FiCalendar} from 'react-icons/fi'
import {format, parse} from 'date-fns'
import {useController} from 'react-hook-form'

import {Input, IconButton, FormControl, InputAdornment} from '@solera/ui'

const MaskedInput = IMaskMixin(({inputRef, ...props}) => (
  <Input {...props} ref={inputRef} />
))

const configDateInputMask = ({
  pattern = 'MM/dd/yy',
  min = new Date(1970, 0, 1),
}) => ({
  pattern,
  mask: Date,
  autofix: true,
  format: date => format(date, pattern),
  parse: str => parse(str, pattern, new Date()),
  blocks: {
    MM: {
      mask: window.IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    yy: {
      mask: window.IMask.MaskedRange,
      from: 0,
      to: 99,
    },
    dd: {
      mask: window.IMask.MaskedRange,
      from: 1,
      to: 31,
    },
  },
})
const DateInput = forwardRef(
  ({control, name, format, rules, className, ...props}, ref) => {
    const maskProps = configDateInputMask({pattern: format})
    const {
      field: {onChange, value},
    } = useController({
      name,
      control,
      rules,
    })

    return (
      <FormControl className={className}>
        <MaskedInput
          ref={ref}
          type="text"
          id={name}
          name={name}
          value={value}
          onAccept={onChange}
          css={{paddingRight: '20px'}}
          {...maskProps}
          {...props}
        />
        <InputAdornment end>
          <FiCalendar size="1.4em" />
        </InputAdornment>
      </FormControl>
    )
  },
)

const PhoneInput = forwardRef(
  ({control, name, rules, format = '000-000-0000', ...props}, ref) => {
    const {
      field: {onChange, value},
    } = useController({
      name,
      control,
      rules,
    })

    return (
      <MaskedInput
        unmask
        type="tel"
        id={name}
        name={name}
        value={value}
        mask={format}
        onAccept={onChange}
        {...props}
      />
    )
  },
)

const PasswordInput = forwardRef((props, ref) => {
  const [type, setType] = useState('password')

  const toggleType = e => {
    e.preventDefault()
    setType(prev => (prev === 'password' ? 'text' : 'password'))
  }

  return (
    <FormControl>
      <Input ref={ref} type={type} css={{paddingRight: '20px'}} {...props} />
      <InputAdornment end>
        <IconButton onClick={toggleType} css={{padding: '0'}}>
          {type === 'password' ? (
            <FiEye fontSize="1.2rem" />
          ) : (
            <FiEyeOff fontSize="1.2rem" />
          )}
        </IconButton>
      </InputAdornment>
    </FormControl>
  )
})

const SearchInput = forwardRef((props, ref) => {
  return (
    <FormControl css={{maxWidth: '300px'}}>
      <InputAdornment>
        <FiSearch />
      </InputAdornment>
      <Input ref={ref} type="search" css={{paddingLeft: '20px'}} {...props} />
    </FormControl>
  )
})

export {MaskedInput, PasswordInput, SearchInput, DateInput, PhoneInput}
