const formatPhone = phone => {
  const tenDigits = phone.replace(/^\+1/g, '')
  return tenDigits.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3')
}

export {formatPhone}
