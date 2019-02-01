# Simple Time Tracking Format

A simple text file format for tracking time, e.g. consulting hours.

## Installation

```sh
npm install simple-time-tracking-format
```

## Format

```text
2019-01-01
13:00 - 14:00 # Worked on foo
14:00 - 15:15 # Worked on bar

2019-01-04
10:15 - 13:45 # Worked on baz
```

## Library Usage

```js
const { parse } = require('simple-time-tracking-format')

const entries = parse('2019-01-01\n13:00 ...')
```

The library exports a single function, `parse`, which takes a string containing the time tracking data. It returns an array of entries with the following properties:

- `start` - The start of the entry as a ISO 8601 formatted string (e.g. `2019-01-01T13:00:00`)
- `end` - The end of the entry as a ISO 8601 formatted string (e.g. `2019-01-01T14:00:00`)
- `comment` - The comment associated with the row, or an empty string (e.g. `Worked on foo`)

## Script Usage

This package ships with a simple script that parses a file and prints a summary for each month

```sh
$ simple-time-tracking-format < my-time-data.txt
2019-01 - 5:45
```
