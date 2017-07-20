const bodyParser = require('body-parser')
const express = require('express')
const jsonfile = require('jsonfile')
const sortKeys = require('./lib/sortkeys')
const app = express()

const sectionPaths = {
  dictionary: 'data/dictionary.json',
  i18nFiles: ['data/phabricator/i18n_files.json', 'data/libphutil/i18n_files.json'],
  prototypeApplications: 'data/prototype_applications.json',
  terminology: 'data/terminology.json',
  translations: 'data/translations.json'
}

// If show libphutil translation in the UI.
const showLibphutil = false

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/data', (req, res) => {
  console.log('Getting data.')

  const data = {}

  // Load all data.
  for (let section in sectionPaths) {
    if (section === 'i18nFiles') {
      const phabricatori18nFiles = jsonfile.readFileSync(sectionPaths[section][0])
      const libphutili18nFiles = jsonfile.readFileSync(sectionPaths[section][1])

      data.categories = sortKeys(getCategories(phabricatori18nFiles, libphutili18nFiles))
    } else {
      data[section] = sortKeys(jsonfile.readFileSync(sectionPaths[section]))
    }
  }

  res.send(data)
})

app.post('/save/:section', (req, res) => {
  const section = req.params.section

  if (['dictionary', 'terminology', 'translations'].indexOf(section) === -1) {
    res.status(400).send('Invalid section parameter!')

    return
  }

  let sourceData = jsonfile.readFileSync(sectionPaths[section])

  req.body.forEach(item => {
    const key = item.key.trim()
    const value = item.value && item.value.trim()

    if (value !== null) {
      sourceData[key] = value
    } else {
      delete sourceData[key]
    }
  })

  if (section === 'terminology' || section === 'dictionary') {
    sourceData = sortKeys(sourceData)
  }

  jsonfile.spaces = 2
  jsonfile.writeFileSync(sectionPaths[section], sourceData)

  console.log((req.body.length === 1 && req.body[0].value === null) ? `Delete ${section}:` : `Save to ${section}:`)
  console.log(req.body)

  res.send('OK')
})

app.listen(3000, () => {
  console.log('App listening on port 3000.')
})

function getCategories(phabricatori18nFiles, libphutili18nFiles) {
  const categories = {}

  buildCategories(categories, phabricatori18nFiles, '')

  if (showLibphutil) {
    buildCategories(categories, libphutili18nFiles, '[libphutil]')
  }

  return categories
}

function buildCategories(categories, i18nFiles, prefix) {
  for (let file in i18nFiles.files) {
    const pathFragments = file.split('/')

    // Group category by applications.
    const category = prefix + (pathFragments[0] === 'applications' ?
      pathFragments[0] + '/' + pathFragments[1] :
      pathFragments[0])

    // Init empty category.
    if (categories[category] === undefined) {
      categories[category] = {}
    }

    // Get strings by file id.
    const fileId = i18nFiles.files[file]
    const strings = i18nFiles.strings[fileId] || []

    // Set strings to cateogries.
    strings.forEach(item => {
      categories[category][item.string] = ''
    })
  }
}
