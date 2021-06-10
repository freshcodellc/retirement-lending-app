/** @jsxImportSource @emotion/react */
import {useState, forwardRef} from 'react'
import {IMaskMixin} from 'react-imask'
import {FiEye, FiEyeOff, FiSearch} from 'react-icons/fi'

import {Input, IconButton, FormControl, InputAdornment} from '@solera/ui'

const MaskedInput = IMaskMixin(({inputRef, ...props}) => (
  <Input {...props} ref={inputRef} />
))

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

export {MaskedInput, PasswordInput, SearchInput}
