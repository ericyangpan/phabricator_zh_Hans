const jsonfile = require('jsonfile')
const pluralize = require('pluralize')

const rulesPath = 'data/rules.json'
const terminologyPath = 'data/terminology.json'

const rules = jsonfile.readFileSync(rulesPath)
const terminology = jsonfile.readFileSync(terminologyPath)

module.exports.check = (translations, callback) => {
  let hasError = false

  for (let key in translations) {
    const value = translations[key]

    if (checkTerminology(key, value, callback)) {
      hasError = true
    }

    if (checkRegexRule(key, value, callback)) {
      hasError = true
    }
  }

  return hasError
}

function checkTerminology(key, value, callback) {
  for (let term in terminology) {
    const pluralTerm = pluralize(term)
    const regexWord = /\w+/g
    const regexKey = new RegExp(`^(${term}|${pluralTerm})$`, 'i')
    const regexValue = new RegExp(terminology[term], 'gi')

    const words = key.match(regexWord) || []

    for (let word of words) {
      if (regexKey.test(word) && !regexValue.test(value)) {
        callback({
          type: 'Terminology',
          rule: `${term} | ${terminology[term]}`,
          translation: `${key} | ${value}`
        })

        return true
      }
    }
  }

  return false
}

function checkRegexRule(key, value, callback) {
  for (let rule in rules.items) {
    const regexKey = new RegExp(rule, 'g')
    const regexValue = new RegExp(rules.items[rule], 'g')

    if (key.match(regexKey) !== null && key.match(regexKey).length !== (value.match(regexValue) || []).length) {
      if (rules.exceptions[rule] && rules.exceptions[rule].indexOf(key) !== -1) continue

      callback({
        type: 'Regex',
        rule: `${rule} | ${rules.items[rule]}`,
        translation: `${key} | ${value}`
      })

      return true
    }
  }

  return false
}