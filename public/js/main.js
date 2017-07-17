const regexWholeWord = /^\w+$/i
const globalDictionary = {}
const globalPhrases = {}
let globalData

const vm = new Vue({
  el: '#app',
  data: {
    form: {
      searchText: '',
      isSearchWord: false,
      searchType: 'text',
      filterLength: 66
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
      this.form.searchText = ''

      resetTextBoxStyle('translationList')

      searchCategory(
        event.target.textContent,
        this.form.filterLength
      ).then(result => {
        vmt.category = result.category
        vmt.filteredCount = result.filteredCount
        vmt.totalCount = result.totalCount
        vmt.items = result.items

        refreshSuggestion()
      })
    },
    search() {
      this.category.show = false

      resetTextBoxStyle('translationList')

      if (!Number.isInteger(this.form.filterLength)) {
        this.form.filterLength = 66
      }

      search(
        this.form.searchText,
        this.form.isSearchWord,
        this.form.searchType,
        this.form.filterLength
      ).then(result => {
        vmt.category = result.category
        vmt.filteredCount = result.filteredCount
        vmt.totalCount = result.totalCount
        vmt.items = result.items

        refreshSuggestion()
      })
    },
    showDialog(event) {
      const title = event.target.textContent

      if (this.dialog.title === title && this.dialog.show) {
        this.dialog.show = false
        return
      }

      this.dialog.title = title
      this.dialog.show = true
      this.dialog.newKey = ''
      this.dialog.newValue = ''
      this.dialog.items = objectToItems(globalData[this.section])

      // TODO: bug
      document.getElementById('newKey').focus()
    },
    closeDialog() {
      this.dialog.show = false
      document.getElementById('searchText').focus()

      resetTextBoxStyle('dialogList')
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
          const textBoxes = document.getElementById('translationList').getElementsByTagName('input')

          for (let i = 0; i < textBoxes.length; i++) { 
            const textBox = textBoxes[i]

            if (textBox.classList.contains('changed') && textBox.value !== '') {
              textBox.classList.remove('changed')
              textBox.classList.add('updated')

              const statusNode = textBox.parentElement.parentElement.lastElementChild

              statusNode.textContent = 'Saved!'

              setTimeout(() => {
                statusNode.textContent = ''
              }, 3000)
            }
          }

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
      .then(parseJSON)
      .then(data => {
        globalData = data

        setGlobalDictionary(globalData.translations, globalData.dictionary)

        let {totalPercent, items} = getCategories(globalData.categories, globalData.translations)

        vm.category.totalPercent = totalPercent
        vm.category.items = items

        window.onhashchange = locationHashChanged

        locationHashChanged()
      })
  }
})

const vmt = new Vue({
  el: '#translation',
  data: {
    category: 'N/A',
    filteredCount: 0,
    totalCount: 0,
    items: []
  },
  computed: {
    section() {
      return 'translations'
    },
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
        ctx.valueTextBox.classList.remove('updated')
        ctx.valueTextBox.classList.add('changed')
      } else {
        ctx.valueTextBox.classList.remove('changed')
      }
    },
    revert(event) {
      const ctx = getRowContext(event.target)

      if (globalData[this.section][ctx.key] === undefined) {
        ctx.valueTextBox.value = ''
      } else {
        ctx.valueTextBox.value = globalData[this.section][ctx.key]
        ctx.valueTextBox.classList.remove('changed')
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
  const options = parseLocationHash(decodeURI(window.location.hash))

  vm.form.searchText = options.text
  vm.form.isSearchWord = options.isWord
  vm.form.searchType = options.type
  vm.form.filterLength = options.filterLength

  resetTextBoxStyle('translationList')

  let promise

  if (options.category !== 'all') {
    promise = searchCategory(
      options.category,
      options.filterLength
    )
  } else {
    promise = search(
      vm.form.searchText,
      vm.form.isSearchWord,
      vm.form.searchType,
      vm.form.filterLength
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

function inputInternal(event, section) {
  const ctx = getRowContext(event.target)

  if (ctx.value !== globalData[section][ctx.key]) {
    ctx.valueTextBox.classList.remove('updated')
    ctx.valueTextBox.classList.add('changed')
  } else {
    ctx.valueTextBox.classList.remove('changed')
  }
}

function processValueKeyInternal(event, section) {
  switch (event.which) {
    // Press down key.
    case 40:
      event.target.parentElement.parentElement.nextSibling.children[1].firstElementChild.focus()
      break
    // Press up key.
    case 38:
      event.target.parentElement.parentElement.previousSibling.children[1].firstElementChild.focus()
      break
    // Press enter key.
    case 13:
      const ctx = getRowContext(event.target)
      const isTranslation = section === 'translations'

      if (isTranslation) {
        if (ctx.value === '') {
          deleteItem(section, ctx.key)
            .then(() => {
              updateStatusNode(ctx, isTranslation)
            })
            .catch(error => {
              console.error(error)
            })
          
          break
        }
      }

      if (ctx.value !== globalData[section][ctx.key]) {
        saveItem(section, ctx.key, ctx.value)
          .then(() => {
            updateStatusNode(ctx, isTranslation)
          })
          .catch(error => {
            console.error(error)
          })
      }

      break
  }
}

function updateStatusNode(ctx, isTranslation) {
  ctx.valueTextBox.classList.remove('changed')
  ctx.valueTextBox.classList.add('updated')

  refreshSuggestion()

  if (isTranslation) {
    const statusNode = ctx.row.lastElementChild

    statusNode.textContent = 'Saved!'

    setTimeout(() => {
      statusNode.textContent = ''
    }, 3000)
  }
}

function resetTextBoxStyle(containerId) {
  const textBoxes = document.getElementById(containerId).getElementsByTagName('input')

  for (let i = 0; i < textBoxes.length; i++) {
    const textBox = textBoxes[i]

    textBox.classList.remove('changed')
    textBox.classList.remove('updated')
  }

}

function setGlobalDictionary(translations, dictionary) {
  for (let key in translations) {
    if (regexWholeWord.test(key)) {
      globalDictionary[key] = translations[key]
    }
  }

  for (let key in dictionary) {
    if (regexWholeWord.test(key)) {
      if (getValueByKey(globalDictionary, key) !== undefined) {
        console.log(`Duplicated translation '${key}': ${getValueByKey(globalDictionary, key)} vs ${dictionary[key]}`)
      }

      globalDictionary[key] = dictionary[key]
    } else {
      if (getValueByKey(globalPhrases, key) !== undefined) {
        console.log(`Duplicated translation '${key}': ${getValueByKey(globalPhrases, key)} vs ${dictionary[key]}`)
      }

      globalPhrases[key] = dictionary[key]
    }
  }
}

function getCategories(categories, translations) {
  const items = []
  let totalKeys = 0
  let totalTranslatedKeys = 0

  for (let category in categories) {
    // Ignore prototype applications.
    if (globalData.prototypeApplications.indexOf(category.replace('applications/', '')) !== -1) continue

    const categoryKeys = Object.keys(categories[category]).length
    let translatedKeys = 0

    for (let key in categories[category]) {
      totalKeys++

      if (translations[key] !== undefined) {
        totalTranslatedKeys++
        translatedKeys++
      }
    }

    if (categoryKeys > 0) {
      items.push(
        {
          group: category,
          isPrototype: globalData.prototypeApplications.indexOf(category.replace('applications/', '')) !== -1,
          percent: computePercent(translatedKeys, categoryKeys)
        }
      )
    }
  }

  const totalPercent = computePercent(totalTranslatedKeys, totalKeys)

  return {totalPercent, items}
}

function search(searchText, isSearchWord, searchType, filterLength) {
  const escapedText = searchType === 'regex' ? searchText : escapeRegExp(searchText)
  const regexSearch = isSearchWord ? new RegExp(`^(${pluralize(escapedText, 1)}|${pluralize(escapedText)})$`, 'gi') : new RegExp(escapedText, 'gi')

  if (searchText.length < 2) {
    return Promise.resolve({
      category: 'All',
      filteredCount: 0,
      totalCount: 0,
      items: []
    })
  }

  const results = []
  const resultIndexes = {}
  let resultIndex = 0
  let totalResultCount = 0
  let resultCount = 0

  setLocationHash({
    category: 'all',
    text: searchText,
    isWord: isSearchWord,
    type: searchType,
    filterLength: filterLength
  })

  for (let category in globalData.categories) {
    for (let key in globalData.categories[category]) {
      if (regexSearch.test(key)) {
        totalResultCount++

        if (key.length > filterLength) continue

        // New item.
        if (resultIndexes[key] === undefined) {
          results.push({
            key: encodeHTML(key).replace(regexSearch, '<span>$&</span>'),
            value: globalData.translations[key],
            category: category,
            suggestion: isSearchWord ? '' : getSuggestion(key)
          })

          resultIndexes[key] = resultIndex
          resultIndex++
        // Exists item.
        } else {
          results[resultIndexes[key]].category += ', ' + category
        }

        resultCount++
      }
    }
  }

  return Promise.resolve({
    category: 'All',
    filteredCount: resultCount,
    totalCount: totalResultCount,
    items: sortByItemKey(results)
  })
}

function searchCategory(category, filterLength) {
  const stringsInCateogry = globalData.categories[category]
  const results = []

  setLocationHash({
    category: category,
    filterLength: filterLength
  })

  for (let key in stringsInCateogry) {
    if (key.length > filterLength) continue

    results.push({
      key: encodeHTML(key),
      value: globalData.translations[key],
      suggestion: getSuggestion(key)
    })
  }
  
  return Promise.resolve({
    category: category,
    filteredCount: results.length,
    totalCount: Object.keys(stringsInCateogry).length,
    items: sortByItemKey(results)
  })
}

function deleteItem(section, key) {
  const data = [{
    key: key,
    value: null
  }]

  console.log(`Delete ${section} ${key}:`)
  console.log(data) 

  return fetch('/save/' + section, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(() => {
      delete globalData[section][key]

      if (globalData.translations[key] === undefined) {
        delete globalDictionary[key]
        delete globalPhrases[key]
      }
    })
}

function saveItem(section, key, value) {
  const data = [{
    key: key,
    value: value
  }]

  console.log(`Save ${section} '${key}':`)
  console.log(data)

  return fetch('/save/' + section, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
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
  const data = []

  const textBoxes = document.getElementById('translationList').getElementsByTagName('input')

  for (let i = 0; i < textBoxes.length; i++) {
    const textBox = textBoxes[i]

    if (textBox.classList.contains('changed') && textBox.value !== '') {
      const key = textBox.parentElement.parentElement.firstElementChild.textContent

      data.push({
        key: key,
        value: textBox.value
      })
    }
  }

  console.log(`Save all to translations:`)
  console.log(data)

  return fetch('/save/translations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(() => {
      data.forEach(item => {
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

  return replacePunctuation(results.join('').trim())
}

function refreshSuggestion() {
  Vue.nextTick(() => {
    const rows = document.getElementById('translationList').getElementsByTagName('tr')

    for (let i = 1; i < rows.length; i++) {
      const key = rows[i].firstElementChild.textContent
      rows[i].children[3].textContent = getSuggestion(key)
    }
  })
}