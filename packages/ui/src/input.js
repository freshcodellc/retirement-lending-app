/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useState, forwardRef } from 'react'
import { IMaskMixin } from 'react-imask'
import { useController } from 'react-hook-form'
import { FiEye, FiEyeOff, FiSearch } from 'react-icons/fi'
import * as colors from './styles/colors'
import { IconButton } from './button'
import { FormControl } from './form'

const Input = forwardRef(
  (
    { hasError, helperText, labelStyles = {}, inputStyles = {}, ...props },
    ref
  ) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <label
        htmlFor={props.name}
        css={{
          fontWeight: '300',
          fontSize: '20px',
          lineHeight: '26px',
          marginBottom: '0.5rem',
          ...labelStyles
        }}
      >
        {props.label}
      </label>
      <input
        css={{
          border: 'none',
          alignSelf: 'stretch',
          padding: '6px 0',
          borderBottom: `2px solid ${hasError ? colors.danger : colors.text}`,
          ...inputStyles
        }}
        ref={ref}
        {...props}
      />
    </div>
  )
)

function InputAdornment({ children, end = false, ...props }) {
  const posStyles = end
    ? { right: 0, marginLeft: '4px' }
    : { left: 0, marginRight: '4px' }
  return (
    <div
      css={{
        position: 'absolute',
        marginBottom: '6px',
        bottom: 0,
        ...posStyles
      }}
      {...props}
    >
      {children}
    </div>
  )
}

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input {...props} ref={inputRef} />
))

const PhoneInput = forwardRef(
  ({ control, name, rules, format = '{+1}000.000.0000', ...props }, ref) => {
    const {
      field: { onChange, value }
    } = useController({
      name,
      control,
      rules
    })

    return (
      <MaskedInput
        ref={ref}
        unmask
        type='tel'
        id={name}
        name={name}
        value={value}
        mask={format}
        onAccept={onChange}
        {...props}
      />
    )
  }
)

const PasswordInput = forwardRef((props, ref) => {
  const [type, setType] = useState('password')

  const toggleType = (e) => {
    e.preventDefault()
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }
  return (
    <FormControl>
      <Input ref={ref} type={type} css={{ paddingRight: '20px' }} {...props} />
      <InputAdornment end>
        <IconButton type='button' onClick={toggleType} css={{ padding: '0' }}>
          {type === 'password' ? (
            <FiEye fontSize='1.2rem' />
          ) : (
            <FiEyeOff fontSize='1.2rem' />
          )}
        </IconButton>
      </InputAdornment>
    </FormControl>
  )
})

function InputError({ children }) {
  return (
    <div
      css={{
        width: '100%',
        position: 'relative'
      }}
    >
      <span
        css={{
          left: 0,
          right: 0,
          top: '8px',
          fontSize: '1.1rem',
          position: 'absolute',
          color: colors.danger
        }}
      >
        {children}
      </span>
    </div>
  )
}

const SearchInput = forwardRef((props, ref) => (
  <FormControl css={{ maxWidth: '300px' }}>
    <InputAdornment>
      <FiSearch />
    </InputAdornment>
    <Input ref={ref} type='search' css={{ paddingLeft: '20px' }} {...props} />
  </FormControl>
))

const SsnInput = forwardRef(
  ({ name, control, rules, format = '000{-}00{-}0000', ...props }, ref) => {
    const {
      field: { onChange, value }
    } = useController({
      name,
      control,
      rules
    })
    return (
      <MaskedInput
        unmask
        id={name}
        name={name}
        value={value}
        mask={format}
        onAccept={onChange}
        {...props}
      />
    )
  }
)


const EinInput = forwardRef(
  ({ name, control, rules, format = '00{-}0000000', ...props }, ref) => {
    const {
      field: { onChange, value }
    } = useController({
      name,
      control,
      rules
    })
    return (
      <MaskedInput
        unmask
        id={name}
        name={name}
        value={value}
        mask={format}
        onAccept={onChange}
        {...props}
      />
    )
  }
)

const CurrencyInput = forwardRef(
  ({ name, control, rules, format = '$num', ...props }, ref) => {
    const {
      field: { onChange, value }
    } = useController({
      name,
      rules,
      control
    })
    const amount = String(value)

    return (
      <MaskedInput
        unmask
        ref={ref}
        id={name}
        name={name}
        mask={format}
        value={amount}
        lazy={false}
        blocks={{
          num: {
            mask: Number,
            thousandsSeparator: ',',
            normalizeZeros: true,
            allowDecimal: true,
            padFractionalZeros: true,
            radix: '.',
            scale: 2
          }
        }}
        onAccept={onChange}
        {...props}
      />
    )
  }
)

export {
  Input,
  InputAdornment,
  MaskedInput,
  PasswordInput,
  SearchInput,
  PhoneInput,
  SsnInput,
  EinInput,
  CurrencyInput,
  InputError
}
