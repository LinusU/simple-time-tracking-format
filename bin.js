#!/usr/bin/env node

const getStdin = require('get-stdin')
const differenceInMinutes = require('date-fns/differenceInMinutes')

const { parse } = require('.')

getStdin().then((input) => {
  const entries = parse(input)
  const months = [...new Set(entries.map(e => e.start.slice(0, 7)))]

  for (const month of months) {
    const minutes = entries.filter(e => e.start.startsWith(month)).reduce((mem, e) => {
      const diff = differenceInMinutes(new Date(e.end), new Date(e.start))

      if (diff <= 0) throw new Error('Start time was after or at end time')
      if (diff > 1440) throw new Error('Failed to calculate duration')

      return mem + diff
    }, 0)

    console.log(`${month} - ${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`)
  }
})
