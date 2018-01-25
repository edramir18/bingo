'use strict'

function random (maxValue) {
  return Math.floor(Math.random() * maxValue)
}

function permute (str) {
  const arrPermutes = []
  const obj = str.split('').reduce((o, v) => {
    if (o.hasOwnProperty(v)) {
      o[v]++
    } else {
      o[v] = 1
    }
    return o
  }, {})
  function permutes (result, elements) {
    if (Object.keys(elements).length === 1 && Object.values(elements)[0] === 1) {
      arrPermutes.push(result + Object.keys(elements)[0])
    } else {
      const local = Object.assign({}, elements)
      const arr = Object.keys(elements)
      arr.forEach(k => {
        const v = local[k]
        if (v === 1) {
          delete local[k]
        } else {
          local[k]--
        }
        permutes(result + k, local)
        local[k] = v
      })
    }
  }
  permutes('', obj)
  return arrPermutes
}
// console.time('permute')
const first = permute('222111').concat(permute('321111'))
const middle = permute('331111').concat(permute('322111')).concat(permute('222211'))
const last = permute('332111').concat(permute('322211')).concat(permute('222221'))
// console.timeEnd('permute')

function generateSerie (index, serie) {
  let local = []
  switch (index) {
    case 0:
      local = first.slice(0)
      break
    case 8:
      local = last.slice(0)
      break
    default:
      local = middle.slice(0)
  }

  let result = false
  while (!result && local.length > 0) {
    const test = local.splice(random(local.length), 1)[0]
    console.log(serie.toString())
    serie.fillColumn(index, test.split(''))
    if (serie.isValid(index)) {
      if (index === 8) return true
      result = generateSerie(index + 1, serie)
    } else {
      serie.cleanColumn(index)
    }
  }
  return result
}

function Serie () {
  this.data = []
  function init (obj) {
    for (let i = 0; i < 6; i++) {
      obj.data.push(Array(9).fill(0))
    }
  }
  this.fillColumn = function (col, arr) {
    arr.forEach((v, i) => { this.data[i][col] = Number(v) })
  }
  this.cleanColumn = function (col) {
    for (let i = 0; i < 6; i++) {
      this.data[i][col] = 0
    }
  }
  this.isValid = function (index) {
    return !this.data.some((row, ri) => {
      let sum = row.reduce((total, v) => {
        return total + v
      }, 0)
      if ((sum + 8 - index) > 15) return true
      return false
    })
  }
  this.toString = function () {
    return this.data.reduce((arr, v) => {
      arr.push(v.join(''))
      return arr
    }, [])
  }

  init(this)
}
const serie = new Serie()
generateSerie(0, serie)
console.log(serie.toString())
