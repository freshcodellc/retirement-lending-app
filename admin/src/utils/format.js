import {format, parseISO} from 'date-fns'

const emptyState =
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

const networth = range => {
  const type = {
    T: 'thousand',
    M: 'million',
    B: 'billion',
  }
  const [start, end] = range.split('_')
  const startAmount = start.slice(0, -1)
  const endAmount = end.slice(0, -1)
  const startType = type[start.slice(-1)]
  const endType = type[end.slice(-1)]

  return `$${startAmount} ${startType}  - $${endAmount} ${endType}`
}

export {
  phone,
  join,
  initial,
  address,
  isoDate,
  format as date,
  emptyState,
  networth,
}
