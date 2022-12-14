import fs from 'fs'
import util from 'util'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1
const input = JSON.parse(fs.readFileSync('./input.txt', 'utf8').trimEnd())
const left = [], right = []

for (let line of input) {
  input.indexOf(line) % 2 === 0 ? left.push(line) : right.push(line)
}

inspect(left)
log( '' )
inspect(right)
