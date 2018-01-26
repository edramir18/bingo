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
  while (local.length > 0) {
    const test = local.splice(random(local.length), 1)[0]
    serie.fillColumn(index, test.split(''))
    if (serie.isValid(index) && (index === 8 || generateSerie(index + 1, serie))) {
      return true
    }
    serie.cleanColumn(index)
  }
  return false
}

function generateAnimatedSerie (serie) {
  let cols = 0
  let wheels = [first.slice(0)]
  const id = setInterval(iterate, 100)

  function iterate () {

    const test = wheels[cols].splice(random(wheels[cols].length), 1)[0]    
    serie.fillColumn(cols, test.split(''))
    console.log(`Testing Column ${cols}:${test} ${serie.inlineArray()}`)
    if (serie.isValid(cols)) {
      if (cols === 8){
        clearInterval(id)
      } else {
        if (cols < 7) {
          wheels[++cols] = middle.slice(0)
        } else {
          wheels[++cols] = last.slice(0)
        }
      }
    } else if (wheels[cols].length === 0){
      serie.cleanColumn(cols)      
      if (--cols < 0) {
        clearInterval(id)
      }
    }
  }  
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
    return this.data.every(row => {
      let sum = row.reduce(sumRow, 0)
      if ((sum + 8 - index) > 15) return false
      return true
    })
  }
  this.inlineArray = function () {
    return this.data.reduce((inline, actual) => {
      return inline.concat(actual)
    },[])
  }
  this.toString = function () {
    return this.data.reduce((arr, v) => {
      arr.push(v.join(''))
      return arr
    }, [])
  }

  function sumRow (total, actual) {
    return total + actual
  }

  init(this)
}
/* for (let i = 0; i < 100000; i++) {
  const serie = new Serie()
  if (generateSerie(0, serie)) {
    console.log(`Serie ${i} correcta`)
  } else {
    console.log('Error Creating serie', serie.toString())
    break
  }
} */
generateAnimatedSerie(new Serie())
