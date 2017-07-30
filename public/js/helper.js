pluralize.addUncountableRule('a')
pluralize.addUncountableRule('as')

const HTMLElementContainer = document.createElement('span')

function isMac() {
  return navigator.appVersion.indexOf('Macintosh') > 0
}

function dbcsByteLength(str) {
  const m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m ? m.length / 2 : 0)
}

function toPascalCase (str) {
  if (str.length < 2) return str

  // The string is not a phrase(not including space) but a word.
  if (str.indexOf(' ') === -1) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase()
  }

  const words = str.split(' ')

  for (let i in words) {
    words[i] = toPascalCase(words[i])
  }

  return words.join(' ')
}

function toChinesePunctuation(text) {
  return text
    .replace(/％/g, '%')
    .replace(/\.{3}/g, '…')
    .replace(/! ?/g, '！')
    .replace(/\? ?/g, '？')
    .replace(/: ?/g, '：')
    .replace(/; ?/g, '；')
    .replace(/, ?/g, '，')
    .replace(/\. ?/g, '。')
    .replace(/ ?\(((?!s).*?)\) ?/g, '（$1）')
    .replace(/ ?"(.+?)" ?/g, '“$1”')
    .replace(/ ?'(.+?)' ?/g, '‘$1’')
    .trim()
}

function escapeRegExp(text) {
  return (text + '').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
}

function encodeHTML(text) {
  HTMLElementContainer.textContent = text

  return HTMLElementContainer.innerHTML
}

function decodeHTML(html) {
  HTMLElementContainer.innerHTML = html

  return HTMLElementContainer.textContent
}

function forEachElements(containerId, tagName, func) {
  const elements = document.getElementById(containerId).getElementsByTagName(tagName)

  for (let i = 0; i < elements.length; i++) {
    func(elements[i])
  }
}

function forEachTextBoxes(containerId, func) {
  forEachElements(containerId, 'input', func)
  forEachElements(containerId, 'textarea', func)
}

function sortByKey(array, key, sortValueFunc) {
  return array.sort((a, b) => {
    const valueA = sortValueFunc ? sortValueFunc(a[key]) : a[key]
    const valueB = sortValueFunc ? sortValueFunc(b[key]) : b[key]

    if (valueA < valueB) {
      return -1
    }

    if (valueA > valueB) {
      return 1
    }

    return 0
  })
}

function sortByPercent(array) {
  return sortByKey(array, 'percent', value => -parseInt(value.substr(0, value.length - 1)) )
}

function objectToItems(obj) {
  const items = []

  for (let key in obj) {
    items.push({
      key: key,
      value: obj[key]
    })
  }

  return items
}

function computePercent(dividend, divisor) {
  const percent = dividend / divisor * 100

  if (percent === 100) {
    return '100%'
  } else if (percent > 99) {
    return '99%'
  } else if (Number.isNaN(percent)) {
    return '---'
  }
  
  return percent.toPrecision(2) + '%'
}

function getValueByKey(object, key) {
  const keys = {}

  keys[key.toLowerCase()] = ''
  keys[key.toUpperCase()] = ''
  keys[toPascalCase(key)] = ''

  // Match singular/plural word.
  if (key.indexOf(' ') === -1) {
    const singular = pluralize(key, 1)
    const plural = pluralize(key)

    // The word is singular.
    if (key === singular) {
      keys[plural.toLowerCase()] = ''
      keys[plural.toUpperCase()] = ''
      keys[toPascalCase(plural)] = ''
    } else {
      keys[singular.toLowerCase()] = ''
      keys[singular.toUpperCase()] = ''
      keys[toPascalCase(singular)] = ''
    }
  }

  for (let k in keys) {
    if (object[k] !== undefined) {
      return object[k]
    }
  }

  return undefined
}

function resetTextBoxStyle(textBox) {
  textBox.classList.remove('changed')
  textBox.classList.remove('updated')
}

function setTextBoxUpdatedStyle(textBox) {
  textBox.classList.remove('changed')
  textBox.classList.add('updated')
}

function setTextBoxChangedStyle(textBox) {
  textBox.classList.remove('updated')
  textBox.classList.add('changed')
}