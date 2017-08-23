// -------------------------------------------------------
// Thanks to https://github.com/hiddentao/fast-levenshtein
// -------------------------------------------------------

module.exports.get = function (str1, str2) {
  // arrays to re-use
  const prevRow = []

  const words1 = str1.split(' ')
  const words2 = str2.split(' ')

  const words1Length = words1.length
  const words2Length = words2.length

  if (words1Length === 1 || words2Length === 1) return -1

  // base cases
  if (words1Length === 0) return words2Length
  if (words2Length === 0) return words1Length

  // two rows
  let curCol, nextCol, i, j, tmp

  // initialise previous row
  for (i = 0; i < words2Length; ++i) {
    prevRow[i] = i
  }

  prevRow[words2Length] = words2Length

  let wordCompare
  // calculate current row distance from previous row without collator
  for (i = 0; i < words1Length; ++i) {
    nextCol = i + 1;

    for (j = 0; j < words2Length; ++j) {
      curCol = nextCol;

      // substution
      wordCompare = words1[i] === words2[j];

      nextCol = prevRow[j] + (wordCompare ? 0 : 1);

      // insertion
      tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }
      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
}