function countDigit (arr) {
  const strArray = arr.join('')
  const count = {
    zero: 0,
    one: 0,
    two: 0,
    three: 0
  }
  if (strArray.match(/0/g)) count.zero = strArray.match(/0/g).length
  if (strArray.match(/1/g)) count.one = strArray.match(/1/g).length
  if (strArray.match(/2/g)) count.two = strArray.match(/2/g).length
  if (strArray.match(/3/g)) count.three = strArray.match(/3/g).length

  return count
}

function checkFirstColumn (arr) {
  const count = countDigit(arr)
  if (count.zero > 0) {
    if (count.three > 0 || count.one === 4) {
      return '321111'
    } else if (count.two === 2) {
      return '222111'
    }
  }
  return false
}

function checkMiddleColumn (arr) {
  const count = countDigit(arr)
  if (count.zero > 0) {
    if (count.three === 2 || count.one === 4) {
      return '331111'
    } else if (count.two >= 1 && (count.three === 1 || count.one === 3)) {
      return '322111'
    } else if (count.two >= 3) {
      return '222211'
    }
  }
  return false
}

function checkLastColumn (arr) {
  const count = countDigit(arr)
  if (count.zero > 0) {
    if (count.three === 2 || count.one === 3) {
      return '332111'
    } else if (count.two >= 2 && (count.three === 1 || count.one === 2)) {
      return '322211'
    } else if (count.two >= 4) {
      return '222221'
    }
  }
  return false
}

function permuteFirst (arr, str, pos) {
  const result = checkFirstColumn((str + '0'.repeat(6 - str.length)).split(''))
  if (result) {
    console.log(str + ':' + result)
    total++
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (pos === 1) {
        console.log(str + arr[i])
        total++
      } else {
        permuteFirst(arr, str + arr[i], pos - 1)
      }
    }
  }
}

function permuteMiddle (arr, str, pos) {
  const result = checkMiddleColumn((str + '0'.repeat(6 - str.length)).split(''))
  if (result) {
    console.log(str + ':' + result)
    total++
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (pos === 1) {
        console.log(str + arr[i])
        total++
      } else {
        permuteMiddle(arr, str + arr[i], pos - 1)
      }
    }
  }
}

function permuteLast (arr, str, pos) {
  const result = checkLastColumn((str + '0'.repeat(6 - str.length)).split(''))
  if (result) {
    console.log(str + ':' + result)
    total++
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (pos === 1) {
        console.log(str + arr[i])
        total++
      } else {
        permuteLast(arr, str + arr[i], pos - 1)
      }
    }
  }
}

function checkRow (arr) {
  const count = countDigit(arr)
  if (count.zero > 0) {
    if (count.three === 3 || count.one === 6) {
      return '333111111'
    } else if (count.two > 0 && (count.three === 2 || count.one === 5)) {
      return '332211111'
    } else if (count.two > 2 && (count.three === 1 || count.one === 4)) {
      return '322221111'
    } else if (count.two > 4) {
      return '222222111'
    }
  }
}

function permuteRow (arr, str, pos) {
  const result = checkRow((str + '0'.repeat(9 - str.length)).split(''))
  if (result) {
    console.log(str + ':' + result)
    total++
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (pos === 1) {
        console.log(str + arr[i])
        total++
      } else {
        permuteRow(arr, str + arr[i], pos - 1)
      }
    }
  }
}

let total = 0
// permuteFirst([1, 2, 3], '', 6)
// permuteMiddle([1, 2, 3], '', 6)
permuteLast([1, 2, 3], '', 6)
// permuteRow([1, 2, 3], '', 9)
console.log(total)
