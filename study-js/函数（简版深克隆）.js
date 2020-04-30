const deepClone = obj => {
  if (typeof obj !== 'object') return obj

  const result = obj instanceof Array ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }

  return result
}
