const IGNORE_PROTOTYPE = true
const IS_SORT_BY_PERCENT = true
const DEFAULT_FILTER_LENGTH = 66
const DEFAULT_CATEGORY = 'N/A'

const regexWholeWord = /^\w+$/i
const globalDictionary = {}
const globalPhrases = {}
let globalData

const vm = new Vue({
  el: '#app',
  data: {
    searchForm: {
      category: DEFAULT_CATEGORY,
      text: '',
      isWord: false,
      type: 'text',
      filterLength: DEFAULT_FILTER_LENGTH
    },
    category: {
      show: false,
      totalPercent: 0,
      items: []
    },
    dialog: {
      show: false,
      title: '',
      newKey: '',
      newValue: '',
      items: []
    }
  },
  computed: {
    section() {
      return this.dialog.title.toLowerCase()
    }
  },
  methods: {
    showCategory() {
      this.category.show = !this.category.show
    },
    searchCategory(event) {
      this.category.show = false
      this.dialog.show = false
      this.searchForm.text = ''
      this.searchForm.category = event.target.textContent

      search(this.searchForm)
    },
    searchText() {
      this.category.show = false

      search(this.searchForm)
    },
    showDialog(event) {
      const title = event.target.textContent

      if (this.dialog.title === title && this.dialog.show) {
        this.dialog.show = false
      } else {
        this.dialog.show = true
        this.dialog.title = title
        this.dialog.newKey = ''
        this.dialog.newValue = ''
        this.dialog.items = objectToItems(globalData[this.section])

        Vue.nextTick(() => document.getElementById('newKey').focus())
      }
    },
    closeDialog() {
      this.dialog.show = false

      forEachTextBoxes('dialogList', textBox => resetTextBoxStyle(textBox))
    },
    addRow() {
      const key = this.section === 'dictionary' ? this.dialog.newKey.toLowerCase() : this.dialog.newKey
      const value = this.dialog.newValue

      if (key === '') return

      if (globalData[this.section][key] !== undefined) {
        alert(`Duplicated item: '${key}'!`)
      } else {
        saveItem(this.section, key, value)
          .then(() => {
            this.dialog.newKey = ''
            this.dialog.newValue = ''

            const items = objectToItems(globalData[this.section])

            items.unshift({
              key: key,
              value: value
            })

            this.dialog.items = items

            refreshSuggestion()
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    deleteRow(event) {
      if (confirm('Are you sure want to delete this item?')) {
        const ctx = getRowContext(event.target)

        deleteItem(this.section, ctx.key)
          .then(() => {
            ctx.row.remove()
            refreshSuggestion()
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    saveAllTranslationValues() {
      saveAllTranslationValuesInternal()
        .then(() => {
          forEachTextBoxes('translationList', textBox => {
            if (!textBox.classList.contains('changed') || textBox.value === '') return

            setTextBoxUpdatedStyle(textBox)

            updateStatusNode(textBox)
          })

          refreshSuggestion()
        })
        .catch(error => {
          console.error(error)
        })
    },
    input(event) {
      inputInternal(event, this.section)
    },
    processValueKey(event) {
      processValueKeyInternal(event, this.section)
    }
  },
  created() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        globalData = data

        setGlobalDictionary(globalData.translations, globalData.dictionary, globalData.terminology)

        let {totalPercent, items} = getCategories(globalData.categories, globalData.translations)

        this.category.totalPercent = totalPercent
        this.category.items = IS_SORT_BY_PERCENT ? sortByPercent(items) : items

        locationHashChanged()

        window.onhashchange = locationHashChanged
      })
  }
})

const vmt = new Vue({
  el: '#translation',
  data: {
    section: 'translations',
    category: DEFAULT_CATEGORY,
    filteredCount: 0,
    totalCount: 0,
    items: []
  },
  computed: {
    translationPercent() {
      return computePercent(this.filteredCount, this.totalCount)
    }
  },
  methods: {
    copy(event) {
      const ctx = getRowContext(event.target)

      if (ctx.suggestion === '') return
      
      ctx.valueTextBox.value = ctx.suggestion

      if (ctx.suggestion !== globalData[this.section][ctx.key]) {
        setTextBoxChangedStyle(ctx.valueTextBox)
      } else {
        resetTextBoxStyle(ctx.valueTextBox)
      }
    },
    revert(event) {
      const ctx = getRowContext(event.target)

      if (globalData[this.section][ctx.key] === undefined) {
        ctx.valueTextBox.value = ''
      } else {
        ctx.valueTextBox.value = globalData[this.section][ctx.key]
        resetTextBoxStyle(ctx.valueTextBox)
      }
    },
    input(event) {
      inputInternal(event, this.section)
    },
    processValueKey(event) {
      processValueKeyInternal(event, this.section)
    }
  }
})

// window.onbeforeunload = event => {
//   event.returnValue = true
//   return true
// }

function locationHashChanged() {
  const options = parseLocationHash()

  search(options)
}

function inputInternal(event, section) {
  const ctx = getRowContext(event.target)

  if (ctx.value !== globalData[section][ctx.key]) {
    setTextBoxChangedStyle(ctx.valueTextBox)
  } else {
    resetTextBoxStyle(ctx.valueTextBox)
  }
}

function processValueKeyInternal(event, section) {
  switch (event.key) {
    case 'ArrowDown':
      if (event.target.parentElement.parentElement.nextSibling) {
        event.target.parentElement.parentElement.nextSibling.children[1].firstElementChild.focus()
      }
      break
    case 'ArrowUp':
      if (event.target.parentElement.parentElement.previousSibling) {
        event.target.parentElement.parentElement.previousSibling.children[1].firstElementChild.focus()
      }
      break
    case 'Enter':
      if (event.target.tagName === 'INPUT' || isMac() && event.metaKey || event.ctrlKey) {
        const ctx = getRowContext(event.target)
        const isTranslation = section === 'translations'

        let promise

        if (isTranslation && ctx.value === '') {
          promise = deleteItem(section, ctx.key)

        } else if (ctx.value !== globalData[section][ctx.key]) {
          promise = saveItem(section, ctx.key, ctx.value)
        }
        
        promise.then(() => {
          setTextBoxUpdatedStyle(ctx.valueTextBox)

          if (isTranslation) {
            updateStatusNode(ctx.valueTextBox)
          }

          refreshSuggestion()
        })
        .catch(error => {
          console.error(error)
        })
      }

      break
  }
}

function updateStatusNode(textBox) {
  const statusNode = textBox.parentElement.parentElement.lastElementChild

  statusNode.textContent = 'Saved!'

  setTimeout(() => {
    statusNode.textContent = ''
  }, 3000)
}

function setGlobalDictionary(translations, dictionary, terminology) {
  function setGlobalDictionaryInternal(key, value, section) {
    if (value.indexOf('|') > 0) return

    if (regexWholeWord.test(key)) {
      if (getValueByKey(globalDictionary, key) !== undefined) {
        console.log(`Duplicated translation '${key}' on ${section}: ${getValueByKey(globalDictionary, key)} vs ${value}`)
      }

      globalDictionary[key] = value
    } else {
      if (getValueByKey(globalPhrases, key) !== undefined) {
        console.log(`Duplicated translation '${key}' on ${section}: ${getValueByKey(globalPhrases, key)} vs ${value}`)
      }

      globalPhrases[key] = value
    }
  }

  for (let key in translations) {
    if (regexWholeWord.test(key)) {
      globalDictionary[key] = translations[key]
    }
  }

  for (let key in dictionary) {
    setGlobalDictionaryInternal(key, dictionary[key], 'dictionary')
  }

  for (let key in terminology) {
    setGlobalDictionaryInternal(key, terminology[key], 'terminology')
  }
}

function getCategories(categories, translations) {
  const items = []
  let totalItemCount = 0
  let totalTranslatedItemCount = 0

  for (let category in categories) {
    const isPrototype = globalData.prototypeApplications.indexOf(category.replace('applications/', '')) !== -1

    // Ignore prototype application category.
    if (IGNORE_PROTOTYPE && isPrototype) continue

    const categoryItemCount = Object.keys(categories[category]).length

    // Ignore empty category.
    if (categoryItemCount === 0) continue

    let categoryTranslatedItemCount = 0

    // Calculate item count of a category.
    for (let key in categories[category]) {
      totalItemCount++

      if (translations[key] !== undefined) {
        totalTranslatedItemCount++
        categoryTranslatedItemCount++
      }
    }

    items.push(
      {
        group: category,
        isPrototype: isPrototype,
        percent: computePercent(categoryTranslatedItemCount, categoryItemCount)
      }
    )
  }

  const totalPercent = computePercent(totalTranslatedItemCount, totalItemCount)

  return {totalPercent, items}
}

function search(options) {
  forEachTextBoxes('translationList', textBox => resetTextBoxStyle(textBox))

  if (!Number.isInteger(vm.searchForm.filterLength)) {
    vm.searchForm.filterLength = DEFAULT_FILTER_LENGTH
    options.filterLength = DEFAULT_FILTER_LENGTH
  }

  setLocationHash(options)

  let promise

  if (options.category !== DEFAULT_CATEGORY) {
    promise = searchCategory(
      options.category,
      options.filterLength
    )
  } else {
    promise = searchText(
      options.text,
      options.isWord,
      options.type,
      options.filterLength
    )
  }

  promise.then(result => {
    vmt.category = result.category
    vmt.filteredCount = result.filteredCount
    vmt.totalCount = result.totalCount
    vmt.items = result.items

    refreshSuggestion()
  })
}

function searchText(text, isWord, type, filterLength) {
  if (text.length < 2) {
    return Promise.resolve({
      category: DEFAULT_CATEGORY,
      filteredCount: 0,
      totalCount: 0,
      items: []
    })
  }

  const escapedText = type === 'regex' ? text : escapeRegExp(text)
  const regexSearch = isWord ? new RegExp(`^(${pluralize(escapedText, 1)}|${pluralize(escapedText)})$`, 'gi') : new RegExp(escapedText, 'gi')
  const results = []
  const resultIndexes = {}
  let resultIndex = 0
  let totalResultCount = 0
  let resultCount = 0

  for (let category in globalData.categories) {
    for (let key in globalData.categories[category]) {
      if (!regexSearch.test(key)) continue

      totalResultCount++

      if (key.length > filterLength) continue

      resultCount++

      // New item.
      if (resultIndexes[key] === undefined) {
        resultIndexes[key] = resultIndex
        resultIndex++

        const item = {
          key: encodeHTML(key).replace(regexSearch, '<span>$&</span>'),
          value: globalData.translations[key],
          suggestion: isWord ? '' : getSuggestion(key),
          category: category
        }

        setTextareaRowCount(item)

        results.push(item)
      // Exists item.
      } else {
        results[resultIndexes[key]].category += ', ' + category
      }
    }
  }

  return Promise.resolve({
    category: DEFAULT_CATEGORY,
    filteredCount: resultCount,
    totalCount: totalResultCount,
    items: sortByKey(results, 'key')
  })
}

function searchCategory(category, filterLength) {
  const items = globalData.categories[category]
  const results = []

  for (let key in items) {
    if (key.length > filterLength) continue

    const item = {
      key: encodeHTML(key),
      value: globalData.translations[key],
      suggestion: getSuggestion(key)
    }

    setTextareaRowCount(item)

    results.push(item)
  }
  
  return Promise.resolve({
    category: category,
    filteredCount: results.length,
    totalCount: Object.keys(items).length,
    items: sortByKey(results, 'key')
  })
}

function deleteItem(section, key) {
  const items = [{
    key: key,
    value: null
  }]

  return saveToServer('Delete', section, key, items)
    .then(() => {
      delete globalData[section][key]

      if (globalData.translations[key] === undefined) {
        delete globalDictionary[key]
        delete globalPhrases[key]
      }
    })
}

function saveItem(section, key, value) {
  const items = [{
    key: key,
    value: value
  }]

  return saveToServer('Save', section, key, items)
    .then(() => {
      globalData[section][key] = value

      if (section === 'translations' || section === 'dictionary') {
        if (regexWholeWord.test(key)) {
          globalDictionary[key] = value
        } else if (section === 'dictionary') {
          globalPhrases[key] = value
        }
      }
    })
}

function saveAllTranslationValuesInternal() {
  const items = []

  forEachTextBoxes('translationList', textBox => {
    if (!textBox.classList.contains('changed') || textBox.value === '') return

    const key = textBox.parentElement.parentElement.firstElementChild.textContent

    items.push({
      key: key,
      value: textBox.value
    })
  })

  return saveToServer('Save', 'translations', DEFAULT_CATEGORY, items)
    .then(() => {
      items.forEach(item => {
        globalData.translations[item.key] = item.value

        if (regexWholeWord.test(item.key)) {
          globalDictionary[item.key] = item.value
        }
      })
    })
}

function getSuggestion(str) {
  if (str === '' || str.length === 1) return str

  // Replace phrases.
  for (let key in globalPhrases) {
    const regexPhrase = new RegExp(key, 'ig')

    str = str.replace(regexPhrase, globalPhrases[key])
  }

  const regexReplace = /\w+\(s\)|\w+'s|%[ds]|\w+/gi
  const regexWord = /\w+/
  const regexChineseChar = /[\u4e00-\u9fa5]/
  const matches = str.match(regexReplace)

  if (matches === null) return str

  str = ' ' + str + ' '

  // Replace translations and dictionaries.
  for (let match of matches) {
    const regexMatch = new RegExp(`[ \\W]{1}${escapeRegExp(match)}[ \\W]{1}`, 'i')
    const word = match.match(regexWord)[0]

    if (str.match(regexMatch) === null) continue

    const fragment = str.match(regexMatch)[0]
    const value = getValueByKey(globalDictionary, word)

    const target = (((value) => {
      if (value === undefined) return fragment
      if (word === match) return fragment.replace(word, value)
      if (match.endsWith('\'s')) return value + '的'

      return value
    })(value))

    if (target !== undefined) {
      str = str.replace(regexMatch, target)
    }
  }

  str = str.replace('  ', ' ')

  const results = []

  results.push(str[0])

  // Remove spaces between Chinese characters.
  for (let i = 1; i < str.length; i++) {
    if (str[i] === ' '
      && regexChineseChar.test(str[i - 1])
      && i + 1 < str.length
      && regexChineseChar.test(str[i + 1])) {
      continue
    } else {
      results.push(str[i])
    }
  }

  return toChinesePunctuation(results.join('').trim())
}

function refreshSuggestion() {
  Vue.nextTick(() => {
    forEachElements('translationList', 'tr', element => {
      const key = element.firstElementChild.textContent

      element.children[3].textContent = getSuggestion(key)
    })
  })
}

function setTextareaRowCount(item) {
  const keyRowCount = Math.ceil(decodeHTML(item.key).length / DEFAULT_FILTER_LENGTH)
  let rowCount

  if (item.value !== undefined) {
    const valueRowCount = Math.ceil(dbcsByteLength(item.value) / DEFAULT_FILTER_LENGTH - 2)

    rowCount = Math.max(keyRowCount, valueRowCount)
  } else {
    rowCount = keyRowCount
  }

  item.isTextarea = rowCount > 1
  item.textareaRowCount = rowCount
}

function setLocationHash(options) {
  const type = options.type || 'text'
  const text = encodeURI(options.text || '')

  window.location.hash = `#${options.category}|${options.isWord ? 'word' : 'any'}|${type}|${options.filterLength}|${text}`
}

function parseLocationHash() {
  const hash = decodeURI(window.location.hash)
  const regex = /^#(all|.+)\|(any|word)\|(text|regex)\|(\d+)\|(.*)$/g
  const matches = regex.exec(hash) || [ null, DEFAULT_CATEGORY, 'any', 'text', DEFAULT_FILTER_LENGTH, '']

  return {
    category: matches[1],
    isWord: matches[2] === 'word',
    type: matches[3],
    filterLength: parseInt(matches[4].toString()),
    text: matches[5]
  }
}

// Get context info about key, value, suggestion and tr element, text box element.
function getRowContext(target) {
  const row = target.parentElement.parentElement
  const key = row.firstElementChild.textContent
  let valueTextBox = null
  let value = null
  let suggestion = null

  // Target is text box.
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

function saveToServer(action, section, key, items, callback) {
  console.log(`${action} ${section} ${key}:`)
  console.log(items) 

  return fetch('/save/' + section, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items)
  })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        const error = new Error(response.statusText)

        error['response'] = response

        throw error
      }
    })
    .then(() => {
      callback()
    })  
}