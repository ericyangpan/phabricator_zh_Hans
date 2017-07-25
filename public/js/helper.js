pluralize.addUncountableRule('a')
pluralize.addUncountableRule('as')

const HTMLElementContainer = document.createElement('span')

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

function replacePunctuation(text) {
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

function sortByItemKey(array) {
  return array.sort((a, b) => {
    if (a.key < b.key) {
      return -1
    }

    if (a.key > b.key) {
      return 1
    }

    return 0
  })
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

function setLocationHash(options) {
  options.type = options.type || 'text'
  options.text = encodeURI(options.text || '')

  window.location.hash = `#${options.category}|${options.isWord ? 'word' : 'any'}|${options.type}|${options.filterLength}|${options.text}`
}

function parseLocationHash() {
  const hash = decodeURI(window.location.hash)
  const regex = /^#(all|.+)\|(any|word)\|(text|regex)\|(\d+)\|(.*)$/g
  const defaultMatches = [ null, 'all', 'any', 'text', '66', '']
  const matches = regex.exec(hash) || defaultMatches

  return {
    category: matches[1],
    isWord: matches[2] === 'word',
    type: matches[3],
    filterLength: parseInt(matches[4]),
    text: matches[5]
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)

    error.response = response

    throw error
  }
}

function parseJSON(response) {
  return response.json()
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

// Get context info about key, value, suggestion and tr element, textbox element.
function getRowContext(target) {
  const row = target.parentElement.parentElement
  const key = row.firstElementChild.textContent
  let valueTextBox = null
  let value = null
  let suggestion = null

  // Target is textbox.
  if ((target.tagName === 'INPUT' && target.getAttribute('type') === 'text') || target.tagName === 'TEXTAREA') {
    valueTextBox = target
    value = target.value
  // Target is action links.
  } else if (target.textContent !== '✕') {
    valueTextBox = target.parentElement.parentElement.children[1].firstElementChild
    suggestion = target.parentElement.parentElement.children[3].textContent
  }

  return {
    row: row,
    key: key,
    value: value,
    valueTextBox: valueTextBox,
    suggestion: suggestion
  }
}

function isMac() {
  return navigator.appVersion.indexOf('Macintosh') > 0
}

function dbcsByteLength(str) {
  const m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m ? m.length / 2 : 0)
}