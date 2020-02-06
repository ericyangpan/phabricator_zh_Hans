const bodyParser = require('body-parser')
const express = require('express')
const jsonfile = require('jsonfile')
const sortKeys = require('./lib/sortkeys')
const dataHelper = require('./lib/datahelper')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

// Get all data from disk.
app.get('/data', (req, res) => {
  console.log('Getting data.')

  const data = loadAllData()

  res.send(data)
})

// Save data to source.
app.post('/save/:dataSourceName', (req, res) => {
  const dataSourceName = req.params.dataSourceName

  // Only support following dataSourceNames to be edited.
  if (!['dictionary', 'terminology', 'translations'].includes(dataSourceName)) {
    res.status(400).send('Invalid dataSourceName parameter!')

    return
  }

  // Load data from file.
  let sourceData = dataHelper.readFile(dataSourceName)

  updateSourceData(sourceData, req.body)

  // Write data to file.
  // Sort items of terminology dataSourceName and dictionary dataSourceName.
  dataHelper.writeFile(
    dataSourceName,
    sourceData,
    ['dictionary', 'terminology'].includes(dataSourceName)
  )

  // Ouput log.
  console.log(
    req.body.length === 1 && req.body[0].value === null
      ? `Delete ${dataSourceName}:`
      : `Save to ${dataSourceName}:`
  )
  console.log(req.body)

  res.send('OK')
})

app.listen(3000, () => {
  console.log('App listening on port http://localhost:3000.')
})

function loadAllData() {
  const allData = {}

  for (let dataSourceName of [
    'prototype_applications',
    'translations',
    'dictionary',
    'terminology'
  ]) {
    allData[dataSourceName] = dataHelper.readFile(dataSourceName, true)
  }

  const phabricatori18nFiles = dataHelper.readFile('phabricator_i18n_files')
  const libphutili18nFiles = dataHelper.readFile('libphutil_i18n_files')
  const discoverSimilars = dataHelper.readFile('discover_similars')

  allData.categories = buildCategories(phabricatori18nFiles, libphutili18nFiles)
  allData.similars = getSimilars(discoverSimilars, allData.translations)

  return allData
}

// Update or delete items.
function updateSourceData(sourceData, items) {
  items.forEach(item => {
    // Value of item to be deleted is null, then delete it.
    if (!item.value) {
      delete sourceData[item.key]

      return
    }

    // Trim value if key can be trimed.
    sourceData[item.key] =
      item.key !== item.key.trim() ? item.value : item.value.trim()
  })
}

function buildCategories(phabricatori18nFiles, libphutili18nFiles) {
  const categories = {}

  getCategories(categories, phabricatori18nFiles, '')

  if (dataHelper.INCLUDE_LIBPHUTIL) {
    getCategories(categories, libphutili18nFiles, '[libphutil]')
  }

  return sortKeys(categories)
}

function getCategories(categories, i18nFiles, prefix) {
  for (let file in i18nFiles.files) {
    if (!dataHelper.INCLUDE_TEST_CASE && file.endsWith('TestCase.php')) {
      continue
    }

    const pathFragments = file.split('/')

    // Group category by applications.
    const category =
      prefix +
      (pathFragments[0] === 'applications'
        ? pathFragments[0] + '/' + pathFragments[1]
        : pathFragments[0])

    // Init empty category.
    if (categories[category] === undefined) {
      categories[category] = {}
    }

    // Get strings by file id.
    const fileId = i18nFiles.files[file]
    const strings = i18nFiles.strings[fileId] || []

    // Set strings to cateogries.
    strings.forEach(item => {
      // Filter some empty strings. They are pht('') in PHP code.
      if (item.string === '') {
        return
      }

      categories[category][item.string] = ''
    })
  }
}

function getSimilars(similars, translations) {
  const results = []
  let groupTranslated

  for (let str in similars) {
    for (let sameSize in similars[str]) {
      groupTranslated = true

      for (let words of similars[str][sameSize]) {
        if (translations[words] === undefined) {
          groupTranslated = false

          break
        }
      }

      if (!groupTranslated) {
        results.push(similars[str][sameSize])
      }
    }
  }

  return results
}
