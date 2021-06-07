const colorsMap = {}

function colors(status) {
  if (status in colorsMap) {
    throw new Error('invalid status')
  }

  return colorsMap[status]
}

export {colors}
