import input from './input.json' assert { type: 'json' }
import util from 'util'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1

let trees = input.map((row) => row.split(''))
for (let row = 0, max = trees.length; row < max; row++) {
  for (let col = 0, max = trees[row].length; col < max; col++) {
    trees[row][col] = parseInt(trees[row][col])
  }
}

const rowsAmount = trees.length
const colsAmount = trees[0].length

let visibleTrees = 2 * (rowsAmount + colsAmount - 2)

const clearWest = (lat, lon, tree) => {
  for (let x = lon - 1; x >= 0; x--) {
    if (trees[lat][x] >= tree) {
      log(tree, trees[lat][x], 'NOT clear West')
      return false
    }
  }
  log(tree, 'clear West')
  return true
}

const clearEast = (lat, lon, tree) => {
  for (let x = lon + 1; x < colsAmount; x++) {
    if (trees[lat][x] >= tree) {
      log(tree, trees[lat][x], 'NOT clear East')
      return false
    }
  }
  log(tree, 'clear East')
  return true
}

const clearNorth = (lat, lon, tree) => {
  for (let y = lat - 1; y >= 0; y--) {
    if (trees[y][lon] >= tree) {
      log(tree, trees[y][lon], 'NOT clear North')
      return false
    }
  }
  log(tree, 'clear North')
  return true
}

const clearSouth = (lat, lon, tree) => {
  for (let y = lat + 1; y < rowsAmount; y++) {
    if (trees[y][lon] >= tree) {
      log(tree, trees[y][lon], 'NOT clear South')
      return false
    }
  }
  log(tree, 'clear South')
  return true
}

for (let lat = 1; lat < rowsAmount - 1; lat++) {
  for (let lon = 1; lon < colsAmount - 1; lon++) {
    let tree = trees[lat][lon]

    if (
      clearEast(lat, lon, tree) ||
      clearWest(lat, lon, tree) ||
      clearNorth(lat, lon, tree) ||
      clearSouth(lat, lon, tree)
    ) {
      visibleTrees++
      continue
    }
  }
}

log(visibleTrees)
log(visibleTrees)
log(visibleTrees)
