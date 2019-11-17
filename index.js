const reDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
const reTime = /^([0-9]{2}:[0-9]{2}) - ([0-9]{2}:[0-9]{2})( #(.*))?$/

exports.parse = function parse (input) {
  const lines = input.split(/\r?\n/g).map(l => l.trim())

  let currentDate = null
  const entries = []

  for (const line of lines) {
    if (line === '') continue

    let m

    if ((m = reDate.exec(line))) {
      if (currentDate !== null && line <= currentDate) {
        throw new Error('Got date that was earlier or equal to previous date')
      }

      currentDate = line
      continue
    }

    if ((m = reTime.exec(line))) {
      if (currentDate === null) {
        throw new Error('Got line entry without preceding date')
      }

      if (m[1] >= m[2]) {
        throw new Error('Start duration was after or at end duration')
      }

      entries.push({
        start: `${currentDate}T${m[1]}:00`,
        end: `${currentDate}T${m[2]}:00`,
        comment: (m[4] || '')
      })
      continue
    }

    throw new Error('Got malformed line')
  }

  return entries
}
