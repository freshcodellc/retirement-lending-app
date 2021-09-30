import currency from 'currency.js'

function setTitle(entity_type) {
  if (["IRA_LLC", "401k_LLC"].includes(entity_type)) {
  return "Manager"
  } else if (["IRA_trust", "401k_trust"].includes(entity_type)) {
    return "Trustee"
  } else {
    return "Custodian"
  }
}

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
        } else if (
          cur.name === 'signature_date' ||
          cur.name === 'term_sheet_signature_date'
        ) {
          value = new Date()
        } else if (cur.name === 'signature_title') {
          value = `${app.first_name} ${app.last_name}, ${setTitle(app.entity_type)}`
        } else if (cur.name === 'signature_entity_name') {
          value = app.entity_name
        }
      }
      acc[key] = value
    }
    return {
      ...acc,
      assigned_admin_user_uuid: app.assigned_admin?.uuid,
    }
  }
}

export {setApplicationDefaultValues}
