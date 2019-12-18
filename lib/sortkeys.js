module.exports = function(obj) {
  if (!obj) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.sort()
  }

  const sortedObj = {}

  Object.keys(obj)
    .sort()
    .forEach(key => {
      sortedObj[key] = obj[key]
    })

  return sortedObj
}
