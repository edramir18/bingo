'use strict'

function random (maxValue) {
  return Math.floor(Math.random() * maxValue)
}

function BingoTicket (ticket) {
  this.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  function selectRandomRow (obj, rowControl, col) {
    const candidates = rowControl.available(obj, col)
    const selection = Number(candidates[random(candidates.length)])
    obj.data[selection][col] = 1
    rowControl.increase(selection)
  }

  function init (obj) {
    const arr = ticket.split('').map(k => Number(k))
    const rows = {
      one: 0,
      two: 0,
      three: 0,
      available: function (obj, col) {
        let s = ''
        if (this.one < 5 && obj.data[0][col] === 0) s = '0'
        if (this.two < 5 && obj.data[1][col] === 0) s = s + '1'
        if (this.three < 5 && obj.data[2][col] === 0) s = s + '2'
        return s
      },
      increase: function (value) {
        if (value === 0) {
          this.one++
        } else if (value === 1) {
          this.two++
        } else if (value === 2) {
          this.three++
        }
      }
    }
    // Process Number 3
    arr.forEach((element, index) => {
      if (element === 3) {
        for (let i = 0; i < 3; i++) {
          selectRandomRow(obj, rows, index)
        }
      }
    })
    // Process Number 2
    arr.forEach((element, index) => {
      if (element === 2) {
        for (let i = 0; i < 2; i++) {
          selectRandomRow(obj, rows, index)
        }
      }
    })
    // Process Number 1
    arr.forEach((element, index) => {
      if (element === 1) {
        selectRandomRow(obj, rows, index)
      }
    })
    console.log(rows)
  }

  init(this)
}

let ticket = new BingoTicket('333111111')
console.log(ticket)
ticket = new BingoTicket('332211111')
console.log(ticket)
ticket = new BingoTicket('322221111')
console.log(ticket)
ticket = new BingoTicket('222222111')
console.log(ticket)
