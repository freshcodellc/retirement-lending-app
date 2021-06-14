import {format, parseISO} from 'date-fns'

const uSCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const currency = (str) => uSCurrency.format(str)

const empty =
  (fn, state = '-') =>
  value =>
    (Array.isArray(value) && value.length) ||
    (typeof value === 'string' && value) ||
    value != null
      ? fn
        ? fn(value)
        : value
      : state

const phone = phone => {
  const tenDigits = phone.replace(/^\+1/g, '')
  return tenDigits.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3')
}

const join = (...names) => names.join(' ').trim()

const initial = name =>
  typeof name === 'string' ? name[0].toUpperCase() + '.' : ''

const isoDate = (str, pattern) => format(parseISO(str), pattern)

const address = ({address, address_2, city, state, postal_code}) => {
  return `${address},
  ${address_2 ? address_2 : ''}
  ${city} ${state},
  ${postal_code}`
}

const yesNo = val => (val ? 'Yes' : 'No')


export {
  phone,
  join,
  initial,
  address,
  isoDate,
  format as date,
  empty,
  currency,
  yesNo,
}
