import input from './input.json' assert { type: 'json' }
import util from 'util'
import { get } from 'http'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1
const grid = input.actual.map((row) => row.split(''))

const getGoals = (grid) => {
  let start = null
  let end = null
  for (let y = 0, max = grid.length; y < max; y++) {
    for (let x = 0, max = grid[y].length; x < max; x++) {
      if (grid[y][x] === 'S') {
        start = [x, y]
      } else if (grid[y][x] === 'E') {
        end = [x, y]
      }
    }
  }
  return { start, end }
}

const mapped = []

const getChildren = (coords) => {
  let [x, y] = coords
  if (mapped.includes(`| ${x} - ${y} |`)) return [null]
  mapped.push(`| ${x} - ${y} |`)
  let neighbors = []
  let childrenList = []
  if (x > 0) neighbors.push([x - 1, y])
  if (x < grid[0].length - 1) neighbors.push([x + 1, y])
  if (y > 0) neighbors.push([x, y - 1])
  if (y < grid.length - 1) neighbors.push([x, y + 1])
  for (let neighbor of neighbors) {
    if (
      grid[neighbor[1]][neighbor[0]] !== 'S' &&
      (grid[neighbor[1]][neighbor[0]] === 'a' ||
        grid[neighbor[1]][neighbor[0]] === 'E' ||
        grid[neighbor[1]][neighbor[0]].charCodeAt(0) <=
          grid[y][x].charCodeAt(0) + 1)
    ) {
      childrenList.push(neighbor)
    }
  }
  const children = childrenList.map((child) => {
    return {
      parent: coords,
      coords: child,
      code: grid[child[1]][child[0]],
      elevation: grid[child[1]][child[0]].charCodeAt(0),
      children: getChildren(child),
      depth: 0,
    }
  })
  return children
}

const mapTerrain = (grid) => {
  const startEnd = getGoals(grid)
  const { start, end } = startEnd

  let map = {
    parent: null,
    coords: start,
    code: 'S',
    elevation: 'a'.charCodeAt(0),
    children: getChildren(start),
    depth: 0,
  }
  return map
}

let terrain = mapTerrain(grid)
// inspect( terrain )

let depth = 0

const mapPaths = ( map ) => {
  if ( map.children[0] === null ) return []
  let paths = []
  depth++
  for ( let child of map.children ) {
    paths.push( [ child.code ] )
    let subPaths = mapPaths( child )
    for ( let subPath of subPaths ) {
      if (child.code === 'E') break
      paths.push( [ child.code, ...subPath ] )
    }
  }
  return paths
}

let paths = mapPaths( terrain )
let goodPaths = paths.filter( path => path[path.length - 1] === 'E' )
let depths = goodPaths.map( path => path.length )
depths = depths.sort( ( a, b ) => a - b )
log( depths[0] )
