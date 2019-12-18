const bodyParser = require('body-parser')
const express = require('express')
const jsonfile = require('jsonfile')
const sortKeys = require('./lib/sortkeys')

const app = express()

const sectionPaths = {
  i18nFiles: [
    'data/phabricator/i18n_files.json',
    'data/libphutil/i18n_files.json'
  ],
  prototypeApplications: 'data/prototype_applications.json',
  translations: 'data/translations.json',
  dictionary: 'data/dictionary.json',
  terminology: 'data/terminology.json',
  similars: 'data/discover/similars.json'
}

// If show libphutil translation in the UI.
const SHOW_LIBPHUTIL = false
// If show test case translation in the UI.
const SHOW_TEST_CASE = false

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/data', (req, res) => {
  console.log('Getting data.')

  const data = loadAllData()

  res.send(data)
})

app.post('/save/:section', (req, res) => {
  const section = req.params.section

  // Only support following sections to be edited.
  if (!['dictionary', 'terminology', 'translations'].includes(section)) {
    res.status(400).send('Invalid section parameter!')

    return
  }

  // Load data from file.
  let sourceData = jsonfile.readFileSync(sectionPaths[section])

  // Update or delete items.
  req.body.forEach(item => {
    // Value of item to be deleted is null, then delete it.
    if (!item.value) {
      delete sourceData[item.key]

      return
    }

    // Trim value if key can be trimed.
    sourceData[item.key] =
      item.key !== item.key.trim() ? item.value : item.value.trim()
  })

  // Sort items of terminology section and dictionary section.
  if (section === 'terminology' || section === 'dictionary') {
    sourceData = sortKeys(sourceData)
  }

  // Write data to file.
  jsonfile.writeFileSync(sectionPaths[section], sourceData, {
    spaces: 2
  })

  // Ouput log.
  console.log(
    req.body.length === 1 && req.body[0].value === null
      ? `Delete ${section}:`
      : `Save to ${section}:`
  )
  console.log(req.body)

  res.send('OK')
})

app.listen(3000, () => {
  console.log('App listening on port http://localhost:3000.')
})

function loadAllData() {
  const allData = {}

  for (let section in sectionPaths) {
    switch (section) {
      case 'i18nFiles':
        const phabricatori18nFiles = jsonfile.readFileSync(
          sectionPaths[section][0]
        )
        const libphutili18nFiles = jsonfile.readFileSync(
          sectionPaths[section][1]
        )

        allData.categories = buildCategories(
          phabricatori18nFiles,
          libphutili18nFiles
        )

        break

      case 'similars':
        allData[section] = getSimilars(
          jsonfile.readFileSync(sectionPaths[section]),
          allData.translations
        )

        break

      default:
        allData[section] = sortKeys(
          jsonfile.readFileSync(sectionPaths[section])
        )

        break
    }
  }

  return allData
}

function buildCategories(phabricatori18nFiles, libphutili18nFiles) {
  const categories = {}

  getCategories(categories, phabricatori18nFiles, '')

  if (SHOW_LIBPHUTIL) {
    getCategories(categories, libphutili18nFiles, '[libphutil]')
  }

  return sortKeys(categories)
}

function getCategories(categories, i18nFiles, prefix) {
  for (let file in i18nFiles.files) {
    if (!SHOW_TEST_CASE && file.endsWith('TestCase.php')) {
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
