'use strict'

function permutar (arr, result, elements) {  
  let last = 0
  const local = Object.assign({}, elements);
  if (!Object.keys(elements)) console.log('error')
  const total = Object.keys(elements).reduce((t, k) => {
    if (elements[k] === 1) last = k
    return t + elements[k]
  }, 0)

  if (total === 1) {
    arr.push(result + last)
  } else {
    Object.keys(elements).forEach(k => {
      if (local[k] > 0) {
        local[k]--
        permutar(arr, result + k, local)
        local[k]++
      }
    })
  }
}

const p = []
const l = {
  '1': 3,
  '2': 2,
  '3': 1
}

permutar(p, '', l)
console.log(p, p.length)
