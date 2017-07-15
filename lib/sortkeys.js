module.exports = function (obj) {
  if (Array.isArray(obj)) {
    return obj.sort()
  }

  const sortedKeys = Object.keys(obj).sort()
  const sortedObj = {}

  sortedKeys.forEach(key => {
    sortedObj[key] = obj[key]
  })

  return sortedObj
}
