import input from './input.json' assert { type: 'json' }
import util from 'util'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1

