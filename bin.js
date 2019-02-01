#!/usr/bin/env node

const getStdin = require('get-stdin')
const differenceInMinutes = require('date-fns/difference_in_minutes')

const { parse } = require('.')

getStdin().then((input) => {
  const entries = parse(input)
  const months = [...new Set(entries.map(e => e.start.slice(0, 7)))]

  for (const month of months) {
    const minutes = entries.filter(e => e.start.startsWith(month)).reduce((mem, e) => mem + differenceInMinutes(e.end, e.start), 0)
    const hours = Math.floor(minutes / 60)

    console.log(`${month} - ${hours}:${String(minutes % 60).padStart(2, '0')}`)
  }
})
