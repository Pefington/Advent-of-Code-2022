import input from './input.json' assert { type: 'json' }
import util from 'util'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1
const grid = input.example.map((row) => row.split(''))

//Get the start and end coords
const getCoords = (grid, char) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === char) {
        return [x, y]
      }
    }
  }
  throw new Error(`Could not find ${char} in grid`)
}
const start = getCoords(grid, 'S')
const end = getCoords(grid, 'E')

