const jsonfile = require('jsonfile')
const pluralize = require('pluralize')

const rulesPath = 'data/rules.json'
const terminologyPath = 'data/terminology.json'

const rules = jsonfile.readFileSync(rulesPath)
const terminology = jsonfile.readFileSync(terminologyPath)

module.exports.check = (translations, callback) => {
  if (!checkRegexRule(translations, callback)) {
    return false
  }

  if (!checkTerminology(translations, callback)) {
    return false
  }

  return true
}

function checkTerminology(translations, callback) {
  const regexWord = /\w+/g
  let flag = true

  for (let term in terminology) {
    const pluralTerm = pluralize(term)
    const regexKey = new RegExp(`^(${term}|${pluralTerm})$`, 'i')
    const regexValue = new RegExp(`${terminology[term]}|.${term}|-${term}`, 'i')

    for (let key in translations) {
      const value = translations[key]
      const words = key.match(regexWord) || []

      for (let word of words) {
        if (regexKey.test(word) && !regexValue.test(value)) {
          callback({
            type: 'Terminology',
            rule: `${term} | ${terminology[term]}`,
            translation: `${key} | ${value}`
          })

          flag = false
        }
      }
    }
  }

  return flag
}

function checkRegexRule(translations, callback) {
  let flag = true

  for (let rule in rules.items) {
    const regexKey = new RegExp(rule, 'g')
    const regexValue = new RegExp(rules.items[rule], 'g')

    for (let key in translations) {
      const value = translations[key]

      const keyMatchCount = (key.match(regexKey) || []).length
      const valueMatchCount = (value.match(regexValue) || []).length

      if (keyMatchCount === 0) {
        continue
      }

      if (keyMatchCount === valueMatchCount) {
        continue
      }

      if (
        rule === ',(?! and)(?! or)' &&
        key.includes(' because') &&
        keyMatchCount + 1 === valueMatchCount
      ) {
        continue
      }

      if (
        rules.exceptions[rule] &&
        rules.exceptions[rule].indexOf(key) !== -1
      ) {
        continue
      }

      callback({
        type: `Regex match: ${keyMatchCount} vs ${valueMatchCount}`,
        rule: `${rule}   vs   ${rules.items[rule]}`,
        translation: `\n${key}\n${value}`
      })

      flag = false
    }
  }

  return flag
}
