const IGNORE_PROTOTYPE = true
const IS_SORT_BY_PERCENT = true
const DEFAULT_FILTER_LENGTH = 66
const NO_CATEGORY = 'N/A'
const SIMILAR_PAGE_SIZE = 10

const regexWholeWord = /^\w+$/i
const globalDictionary = {}
const globalPhrases = {}
let globalData

const vm = new Vue({
  el: '#app',
  data: {
    searchForm: {
      category: NO_CATEGORY,
      text: '',
      isEmpty: false,
      isWord: false,
      type: 'text',
      filterLength: DEFAULT_FILTER_LENGTH,
      similarPageNumber: 0
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

    search(event) {
      this.category.show = false
      this.dialog.show = false
      this.searchForm.similarPageNumber = 0

      if (event.target.tagName === 'A') {
        // Search in category.
        this.searchForm.category = event.target.textContent
        this.searchForm.text = ''
      } else if (event.target.name !== 'filterLength') {
        // Seach text, reset category.
        this.searchForm.category = NO_CATEGORY
      }

      searchInternal(this.searchForm)
    },

    switchIsEmpty(event) {
      searchInternal(this.searchForm)
    },

    switchIsWord(event) {
      const searchTextBox = event.target.parentElement.firstElementChild

      if (this.searchForm.isWord) {
        this.searchForm.type = 'text'
        searchTextBox.placeholder = 'Search word...'
      } else {
        searchTextBox.placeholder = 'Search...'
      }

      searchInternal(this.searchForm)
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
      const key =
        this.section === 'dictionary'
          ? this.dialog.newKey.toLowerCase()
          : this.dialog.newKey
      const value = this.dialog.newValue

      if (key === '') {
        return
      }

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
            if (
              !textBox.classList.contains('changed') ||
              textBox.value === ''
            ) {
              return
            }

            setTextBoxUpdatedStyle(textBox)

            updateStatusNode(textBox)

            const ctx = getRowContext(textBox)

            refreshTranslation(ctx.key, ctx.value)
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
    },
    loadSimilarPage(delta) {
      if (this.searchForm.similarPageNumber + delta === 0) return
      if (
        this.searchForm.similarPageNumber + delta >=
        Math.ceil(globalData.similars.length / SIMILAR_PAGE_SIZE)
      ) {
        if (delta < 0) {
          this.searchForm.similarPageNumber += delta
        }

        return
      }

      this.searchForm.similarPageNumber += delta
      this.searchForm.text = ''

      searchInternal(this.searchForm)
    }
  },
  created() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        globalData = data

        setGlobalDictionary(
          globalData.translations,
          globalData.dictionary,
          globalData.terminology
        )

        let [totalPercent, items] = getCategories(
          globalData.categories,
          globalData.translations
        )

        this.category.totalPercent = totalPercent
        this.category.items = items

        locationHashChanged()

        window.onhashchange = locationHashChanged
      })
  }
})

const vmt = new Vue({
  el: '#translation',
  data: {
    section: 'translations',
    category: NO_CATEGORY,
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

      if (ctx.suggestion === '') {
        return
      }

      ctx.valueTextBox.value = ctx.suggestion.replace(/↵/g, '\n')

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

  vm.searchForm = options

  searchInternal(options)
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
      if (
        event.target.tagName === 'INPUT' &&
        event.target.parentElement.parentElement.nextSibling
      ) {
        event.target.parentElement.parentElement.nextSibling.children[1].firstElementChild.focus()
      }
      break
    case 'ArrowUp':
      if (
        event.target.tagName === 'INPUT' &&
        event.target.parentElement.parentElement.previousSibling
      ) {
        event.target.parentElement.parentElement.previousSibling.children[1].firstElementChild.focus()
      }
      break
    case 'Enter':
      if (
        event.target.tagName === 'INPUT' ||
        (isMac() && event.metaKey) ||
        event.ctrlKey
      ) {
        const ctx = getRowContext(event.target)
        const isTranslation = section === 'translations'

        let promise

        if (isTranslation && ctx.value === '') {
          promise = deleteItem(section, ctx.key)
        } else {
          ctx.value = ctx.value.replace(/％(\d\$)*(s|d)/g, '%$1$2')

          if (ctx.value !== globalData[section][ctx.key]) {
            promise = saveItem(section, ctx.key, ctx.value)
          }
        }

        if (promise) {
          promise
            .then(() => {
              setTextBoxUpdatedStyle(ctx.valueTextBox)

              if (isTranslation) {
                updateStatusNode(ctx.valueTextBox)
                refreshTranslation(ctx.key, ctx.value)
              }

              refreshSuggestion()
            })
            .catch(error => {
              console.error(error)
            })
        }
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
  function setGlobalDictionaryInternal(obj) {
    for (let key in obj) {
      if (obj[key].indexOf('|') >= 0) continue

      if (regexWholeWord.test(key)) {
        globalDictionary[key] = obj[key]
      } else {
        globalPhrases[key] = obj[key]
      }
    }
  }

  for (let key in translations) {
    if (regexWholeWord.test(key)) {
      globalDictionary[key] = translations[key]
    }
  }

  setGlobalDictionaryInternal(dictionary)
  setGlobalDictionaryInternal(terminology)
}

function getCategories(categories, translations) {
  const items = []
  let totalItemCount = 0
  let totalTranslatedItemCount = 0

  for (let category in categories) {
    const isPrototype =
      globalData.prototype_applications.indexOf(
        category.replace('applications/', '')
      ) !== -1

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

    items.push({
      group: category,
      isPrototype: isPrototype,
      percent: computePercent(categoryTranslatedItemCount, categoryItemCount)
    })
  }

  const totalPercent = computePercent(totalTranslatedItemCount, totalItemCount)

  return [totalPercent, IS_SORT_BY_PERCENT ? sortByPercent(items) : items]
}

function searchInternal(options) {
  forEachTextBoxes('translationList', textBox => resetTextBoxStyle(textBox))

  if (!Number.isInteger(vm.searchForm.filterLength)) {
    vm.searchForm.filterLength = DEFAULT_FILTER_LENGTH
    options.filterLength = DEFAULT_FILTER_LENGTH
  }

  setLocationHash(options)

  let promise

  if (options.similarPageNumber !== 0) {
    promise = searchSimilar(options.similarPageNumber)
  } else if (options.category !== NO_CATEGORY) {
    promise = searchCategory(
      options.category,
      options.isEmpty,
      options.filterLength
    )
  } else {
    promise = searchText(
      options.text,
      options.isEmpty,
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

function searchText(text, isEmpty, isWord, type, filterLength) {
  if (text.length < 2) {
    return Promise.resolve({
      category: NO_CATEGORY,
      filteredCount: 0,
      totalCount: 0,
      items: []
    })
  }

  const escapedText = type === 'regex' ? text : escapeRegExp(text)
  const regexSearch = isWord
    ? new RegExp(
        `^(${pluralize(escapedText, 1)}|${pluralize(escapedText)})$`,
        'i'
      )
    : new RegExp(escapedText, 'i')
  const results = []
  const resultIndexes = {}
  let resultIndex = 0
  let totalResultCount = 0
  let resultCount = 0

  for (let category in globalData.categories) {
    for (let key in globalData.categories[category]) {
      if (isEmpty && globalData.translations[key] !== undefined) {
        continue
      }

      if (
        !regexSearch.test(key) &&
        !regexSearch.test(globalData.translations[key])
      )
        continue

      totalResultCount++

      if (key.length > filterLength) continue

      resultCount++

      if (resultIndexes[key] === undefined) {
        // New item.
        resultIndexes[key] = resultIndex
        resultIndex++

        const item = {
          key: encodeHTML(key).replace(regexSearch, '<span>$&</span>'),
          value: globalData.translations[key] || '',
          suggestion: isWord ? '' : getSuggestion(key),
          category: category
        }

        item.highlight = item.value !== ''

        setTextareaRowCount(item)

        results.push(item)
      } else {
        // Item exists.
        results[resultIndexes[key]].category += ', ' + category
      }
    }
  }

  return Promise.resolve({
    category: NO_CATEGORY,
    filteredCount: resultCount,
    totalCount: totalResultCount,
    items: sortByKey(results, 'key')
  })
}

function searchCategory(category, isEmpty, filterLength) {
  const items = globalData.categories[category]
  const results = []

  for (let key in items) {
    if (isEmpty && globalData.translations[key] !== undefined) {
      continue
    }

    if (key.length > filterLength) {
      continue
    }

    const item = {
      key: encodeHTML(key),
      value: globalData.translations[key] || '',
      suggestion: getSuggestion(key)
    }

    item.highlight = item.value !== ''

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

function searchSimilar(pageNumber) {
  const from = SIMILAR_PAGE_SIZE * (pageNumber - 1)
  const to = SIMILAR_PAGE_SIZE * pageNumber
  const results = []

  for (let i = from; i < to; i++) {
    const diff = getDiff(globalData.similars[i])
    const length = globalData.similars[i].length

    for (let j = 0; j < length; j++) {
      const key = globalData.similars[i][j]
      const item = {
        key: diff[key],
        value: globalData.translations[key] || '',
        highlight: i % 2 === 1,
        suggestion: getSuggestion(key)
      }

      setTextareaRowCount(item)

      results.push(item)
    }
  }

  vmt.category = NO_CATEGORY
  vmt.filteredCount = results.length
  vmt.totalCount = results.length
  vmt.items = results

  return Promise.resolve({
    category: NO_CATEGORY,
    filteredCount: results.length,
    totalCount: results.length,
    items: results
  })
}

function deleteItem(section, key) {
  const items = [
    {
      key: key,
      value: null
    }
  ]

  return saveToServer('Delete', section, key, items).then(() => {
    delete globalData[section][key]

    if (globalData.translations[key] === undefined) {
      delete globalDictionary[key]
      delete globalPhrases[key]
    }
  })
}

function saveItem(section, key, value) {
  const items = [
    {
      key: key,
      value: value
    }
  ]

  return saveToServer('Save', section, key, items).then(() => {
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

    const key =
      textBox.parentElement.parentElement.firstElementChild.textContent

    items.push({
      key: key,
      value: textBox.value
    })
  })

  return saveToServer('Save', 'translations', 'all', items).then(() => {
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
    const regexMatch = new RegExp(
      `[ \\W]{1}${escapeRegExp(match)}[ \\W]{1}`,
      'i'
    )
    const word = match.match(regexWord)[0]

    if (str.match(regexMatch) === null) continue

    const fragment = str.match(regexMatch)[0]
    let value = getValueByKey(globalDictionary, word)

    // Hacked translation of "Type".
    if (word === 'Type') {
      value = '键入'
    }

    const target = (value => {
      if (value === undefined) return fragment
      if (word === match) return fragment.replace(word, value)
      if (match.endsWith("'s")) return value + '的'

      return value
    })(value)

    if (target !== undefined) {
      str = str.replace(regexMatch, target)
    }
  }

  str = str.replace('  ', ' ').trim()
  // Remove tailing 's'
  str = str.replace(/([\u4e00-\u9fa5])s */g, '$1')

  const results = []

  results.push(str[0])

  // Remove spaces between Chinese characters.
  for (let i = 1; i < str.length; i++) {
    if (
      str[i] === ' ' &&
      regexChineseChar.test(str[i - 1]) &&
      i + 1 < str.length &&
      regexChineseChar.test(str[i + 1])
    ) {
      continue
    } else {
      results.push(str[i])
    }
  }

  // Convert to Chinese punctuation.
  let resultContent = toChinesePunctuation(results.join('').trim())

  // Highlight carriage return char.
  resultContent = resultContent.replace(/↵/g, '<i>↵</i><br/>')

  return resultContent
}

function refreshTranslation(key, translation) {
  Vue.nextTick(() => {
    forEachElements('translationList', 'tr', (element, i) => {
      if (i === 0) return

      if (
        element.firstElementChild.textContent === key &&
        element.children[1].firstElementChild.value !== translation
      ) {
        element.children[1].firstElementChild.value = translation

        setTextBoxUpdatedStyle(element.children[1].firstElementChild)
      }
    })
  })
}

function refreshSuggestion() {
  Vue.nextTick(() => {
    forEachElements('translationList', 'tr', (element, i) => {
      if (i === 0) return

      const key = element.firstElementChild.textContent

      const suggestion = getSuggestion(key)
      const translation = globalData.translations[key] || ''

      element.children[3].innerHTML = suggestion
      element.children[3].style.color =
        suggestion === translation
          ? 'brown'
          : isSimilar(translation, suggestion)
          ? 'orange'
          : 'black'
    })
  })
}

function setTextareaRowCount(item) {
  const keyRowCount = Math.ceil(
    decodeHTML(item.key).length / DEFAULT_FILTER_LENGTH
  )
  let rowCount

  if (item.value !== undefined) {
    const valueRowCount = Math.ceil(
      dbcsByteLength(item.value) / DEFAULT_FILTER_LENGTH - 2
    )

    rowCount = Math.max(keyRowCount, valueRowCount)
  } else {
    rowCount = keyRowCount
  }

  rowCount += (item.key.match(/\n/g) || []).length

  item.key = item.key.replace(/\n/g, '<i>&crarr;</i><br/>')
  item.isTextarea = rowCount > 1
  item.textareaRowCount = rowCount
}

function setLocationHash(options) {
  const isEmpty = options.isEmpty ? 'empty' : 'all'
  const isWord = options.isWord ? 'word' : 'any'
  const text = encodeURI(options.text || '')

  window.location.hash = `#${options.category}|${isEmpty}|${isWord}|${options.type}|${options.filterLength}|${options.similarPageNumber}|${text}`
}

function parseLocationHash() {
  const defaultValues = [
    null,
    NO_CATEGORY,
    'all',
    'any',
    'text',
    DEFAULT_FILTER_LENGTH,
    0,
    ''
  ]
  const regex = /^#(all|.+)\|(all|empty)\|(any|word)\|(text|regex)\|(\d+)\|(\d+)\|(.*)$/g
  const matches = regex.exec(decodeURI(window.location.hash)) || defaultValues

  return {
    category: matches[1],
    isEmpty: matches[2] === 'empty',
    isWord: matches[3] === 'word',
    type: matches[4],
    filterLength: parseInt(matches[5]),
    similarPageNumber: parseInt(matches[6]),
    text: matches[7]
  }
}

// Get context info about key, value, suggestion and tr element, text box element.
function getRowContext(target) {
  const row =
    target.tagName === 'I'
      ? target.parentElement.parentElement.parentElement
      : target.parentElement.parentElement
  const key = row.firstElementChild.textContent
  let valueTextBox = null
  let value = null
  let suggestion = null

  // Target is text box.
  if (
    (target.tagName === 'INPUT' && target.getAttribute('type') === 'text') ||
    target.tagName === 'TEXTAREA'
  ) {
    valueTextBox = target
    value = target.value
    // Target is action links.
  } else if (target.textContent !== '✕') {
    valueTextBox = row.children[1].firstElementChild
    suggestion = row.children[3].textContent
  }

  return {
    row: row,
    key: key,
    value: value,
    valueTextBox: valueTextBox,
    suggestion: suggestion
  }
}

function saveToServer(action, section, key, items) {
  console.log(`${action} ${section} '${key}':`)
  console.log(items)

  const savedItems = items.map(item => {
    return {
      key: item.key.replace(/↵/g, '\n'),
      value: item.value
    }
  })

  return fetch('/save/' + section, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(savedItems)
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)

      error['response'] = response

      throw error
    }
  })
}

function getDiff(items) {
  if (!items || items.length === 0) {
    throw new Error('Parameter "items" can not be null or empty.')
  }

  const diffResult = {}

  if (items.length < 2) {
    const item0 = items[0]
    diffResult[item0] = item0

    return diffResult
  }

  const itemArray = []
  const indexArray = []
  const tempIndexArray = []
  const diffArray = []
  const tempDiffArray = []

  for (let item of items) {
    itemArray.push(item.split(' '))
    indexArray.push(0)
    diffArray.push([])
    tempDiffArray.push([])
    diffResult[item] = ''
  }

  const itemArray0 = itemArray[0]

  for (let i = 0; i < itemArray0.length; i++) {
    const word = itemArray0[i]

    let isInclude = true

    tempDiffArray[0].push(word)
    tempIndexArray[0] = i + 1

    for (let j = 1; j < itemArray.length; j++) {
      const item = itemArray[j]
      let isFound = false

      for (let k = indexArray[j]; k < item.length; k++) {
        if (
          word.toLowerCase() === item[k].toLowerCase() ||
          (word[word.length - 1] === '.' &&
            word.substr(0, word.length - 1).toLowerCase() ===
              item[k].toLowerCase())
        ) {
          isFound = true
          tempIndexArray[j] = k + 1
          tempDiffArray[j].push(item[k])

          break
        } else {
          tempDiffArray[j].push('<span>' + item[k] + '</span>')
        }
      }

      if (!isFound) {
        isInclude = false

        break
      }
    }

    if (!isInclude) {
      diffArray[0].push('<span>' + word + '</span>')
      indexArray[0]++
    }

    for (let i = 0; i < itemArray.length; i++) {
      if (isInclude) {
        for (let n = 0; n < tempDiffArray[i].length; n++) {
          diffArray[i].push(tempDiffArray[i][n])
        }

        indexArray[i] = tempIndexArray[i]
        tempDiffArray[i] = []
      } else {
        tempDiffArray[i] = []
      }
    }
  }

  for (let l = 0; l < items.length; l++) {
    if (itemArray[l].length > indexArray[l]) {
      for (let m = indexArray[l]; m < itemArray[l].length; m++) {
        diffArray[l].push('<span>' + itemArray[l][m] + '</span>')
      }
    }

    diffResult[items[l]] = diffArray[l].join(' ')

    if (items[l] !== decodeHTML(diffResult[items[l]])) {
      console.log('Text:', items[l])
      console.log('HTML:', diffResult[items[l]])
    }
  }

  return diffResult
}
