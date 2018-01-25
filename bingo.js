'use strict'

function Bingo () {
  const bingorows = [
    '333111111',
    '332211111',
    '322221111',
    '222222111'
  ]
  this.rows = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  this.columns = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
  this.randomRow = function (rowNumber) {
    const arr = []
    const count = countDigit(this.rows[rowNumber])
    if (count.zero > 0) {
      if (count.three === 3 || count.one === 6) {
        fillRow(this, rowNumber, '333111111')
      } else if (count.two > 0 && (count.three === 2 || count.one === 5)) {
        fillRow(this, rowNumber, '332211111')
      } else if (count.two > 2 && (count.three === 1 || count.one === 4 )) {
        fillRow(this, rowNumber, '322221111')
      } else if (count.two > 4) {
        fillRow(this, rowNumber, '222222111')
      } else {
        if (count.three < 3 && count.two === 0) {
          arr.push('333111111')
        }
        if (count.three <= 2 && count.two <= 2) {
          arr.push('332211111')
        }
        if (count.three <= 1 && count.two <= 4) {
          arr.push('322221111')
        }
        if (count.three === 0 && count.one <= 3) {
          arr.push('222222111')
        }
        console.log('arr: ', arr)
        fillRow(this, rowNumber, arr[random(arr.length)])
      }
      for (let i = 0; i < 9; i++) {
        if (i === 0) {
          checkFirstColumn(this)
        } else if (i === 8) {
          checkLastColumn(this)
        } else {
          checkMiddleColumn(this, i)
        }
      }
    }
  }

  function checkFirstColumn (obj) {
    const count = countDigit(obj.columns[0])
    if (count.zero > 0) {
      if (count.three > 0 || count.one === 4) {
        fillColumn(obj, 0, '321111')
      } else if (count.two === 2) {
        fillColumn(obj, 0, '222111')
      }
    }
  }

  function checkMiddleColumn (obj, col) {
    const count = countDigit(obj.columns[col])
    if (count.zero > 0) {
      if(count.three === 2 || count.one === 4) {
        fillColumn(obj, col, '331111')
      } else if (count.two >= 1 && (count.three === 1 || count.one === 3)) {
        fillColumn(obj, col, '322111')
      } else if (count.two >= 3) {
        fillColumn(obj, col, '222211')
      }
    }
  }

  function checkLastColumn (obj) {
    const count = countDigit(obj.columns[8])
    if (count.zero > 0) {
      if (count.three === 2 || count.one === 3) {
        fillColumn(obj, 8, '332111')
      } else if (count.two >= 2 && (count.three === 1 || count.one === 2)) {
        fillColumn(obj, 8, '322211')
      } else if (count.two >= 4) {
        fillColumn(obj, 8, '222221')
      }
    }
  }

  function fillRow (obj, rowNumber, str) {
    let strRow = obj.rows[rowNumber].join('')
    const randomArray = randomString(str).filter(k => {
      if (strRow.indexOf(k) >= 0) {
        strRow = strRow.replace(k, '#')
        return false
      }
      return true
    })
    for (let i = 0; i < 9; i++) {
      if (obj.rows[rowNumber][i] === 0) {
        let r = randomArray.shift()
        obj.rows[rowNumber][i] = r
        obj.columns[i][rowNumber] = r
      }
    }
  }

  function fillColumn (obj, colNumber, str) {
    let strCol = obj.columns[colNumber].join('')
    const randomArray = randomString(str).filter(k => {
      if (strCol.indexOf(k) >= 0) {
        strCol = strCol.replace(k, '#')
        return false
      }
      return true
    })
    for (let i = 0; i < 6; i++) {
      if (obj.columns[colNumber][i] === 0) {
        let r = randomArray.shift()
        obj.rows[i][colNumber] = r
        obj.columns[colNumber][i] = r
      }
    }
  }

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

  function randomString (str) {
    let strRandom = str
    const result = []
    while (strRandom.length > 0) {
      let i = random(strRandom.length)
      result.push(Number(strRandom[i]))
      strRandom = strRandom.substr(0, i) + strRandom.substr(i + 1)
    }
    return result
  }

  function random (value) {
    return Math.floor(Math.random() * value)
  }
}

const bingo = new Bingo()

bingo.randomRow(0)
console.log(bingo.rows)
bingo.randomRow(1)
console.log(bingo.rows)
bingo.randomRow(2)
console.log(bingo.rows)
bingo.randomRow(3)
console.log(bingo.rows)
bingo.randomRow(4)
console.log(bingo.rows)
bingo.randomRow(5)
console.log(bingo.rows)
