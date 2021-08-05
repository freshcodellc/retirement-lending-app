import currency from 'currency.js'

function setApplicationDefaultValues(app) {
  return (acc, cur) => {
    if (cur.name in app) {
      let key = cur.name
      let value = app[cur.name]

      if (value != null) {
        if (cur.type === 'radio') {
          if (value === true) {
            value = 'true'
          } else if (value === false) {
            value = 'false'
          }
        } else if (cur.type === 'currency') {
          value = currency(value, {fromCents: true})
        } else if (cur.type === 'custodian') {
          value = value || {}
        } else if (['physical', 'mailing', 'property'].includes(cur.type)) {
          const addressPos = value.findIndex(a => a.type === cur.type)
          key = cur.type
          if (addressPos !== -1) {
            value = {...value[addressPos]}
          } else {
            value = {}
          }
        }
      } else {
        if (cur.type === 'select') {
          value = 'empty'
        } else if (cur.name === 'signature_date') {
          value = new Date()
        }
      }
      acc[key] = value
    }
    return acc
  }
}

export {setApplicationDefaultValues}
