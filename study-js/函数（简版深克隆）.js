function deepClone (obj) {
  if (typeof obj === 'object') {
    let result = obj instanceof Array ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
    return result;
  }
  return obj;
}
