const path = require('path')
const jsonfile = require('jsonfile')
const sortKeys = require('./sortkeys')

module.exports = {
  INCLUDE_TEST_CASE: false,
  INCLUDE_LIBPHUTIL: false,

  dataSourcePaths: {
    phabricator_i18n_files: 'data/phabricator/i18n_files.json',
    libphutil_i18n_files: 'data/libphutil/i18n_files.json',
    prototype_applications: 'data/prototype_applications.json',
    dictionary: 'data/dictionary.json',
    terminology: 'data/terminology.json',
    translations: 'data/translations.json',
    discover_obsoleted: 'data/discover/obsoleted.json',
    discover_similars: 'data/discover/similars.json',
    discover_strings: 'data/discover/strings.json',
    discover_terminology: 'data/discover/terminology.json',
    discover_units: 'data/discover/units.json'
  },

  getPath(dataSouceName) {
    const pathFragment =
      dataSouceName === 'prototype_applications'
        ? dataSouceName
        : dataSouceName.replace('_', path.sep)

    return path.join('data', pathFragment + '.json')
  },

  readFile(dataSourceName, isSorted) {
    const dataSourcePath = this.getPath(dataSourceName)

    if (!dataSourcePath) {
      return null
    }

    const results = jsonfile.readFileSync(dataSourcePath)

    if (isSorted) {
      return sortKeys(results)
    }

    return results
  },

  writeFile(dataSourceName, data, isSorted) {
    const dataSourcePath = this.getPath(dataSourceName)

    if (!dataSourcePath) {
      return null
    }

    let results = data

    if (isSorted) {
      results = sortKeys(data)
    }

    jsonfile.writeFileSync(dataSourcePath, results, {
      spaces: 2
    })
  }
}
