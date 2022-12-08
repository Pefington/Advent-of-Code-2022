import input from './input.json' assert { type: 'json' }
import util from 'util'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (variable) => console.log('\n', variable, '\n\n', '-'.repeat(40))

//Part 1
const getNode = (nodes, path) => {
  path = [...path]
  let first = path.shift()
  let node = nodes.find((node) => node.name === first)
  if (!node) throw new Error('Node not found', first)
  return path.length === 0 ? node : getNode(node.children, path)
}

const mapFS = (input) => {
  input = input.map((command) => command.split(' '))

  let fs = [
    {
      type: 'dir',
      name: '/',
      children: [],
    },
  ]

  let currentPath = ['/']
  let currentDir = getNode(fs, currentPath)

  for (let command of input) {
    if (!isNaN(parseInt(command[0]))) {
      currentDir.children.push({
        type: 'file',
        name: command[1],
        size: parseInt(command[0]),
      })
    } else if (command[1] === '..') {
      currentPath.pop()
      currentDir = getNode(fs, currentPath)
    } else if (command[0] === 'cd') {
      currentPath.push(command[1])
      currentDir.children.push({
        type: 'dir',
        name: command[1],
        size: 0,
        children: [],
      })
      currentDir = getNode(fs, currentPath)
    }
  }
  return fs
}

let fs = mapFS(input)

const calculateSize = (fileSystem) => {
  for (let node of fileSystem) {
    if (node.type === 'dir') {
      calculateSize(node.children)
      node.size = node.children.reduce(
        (dirSize, child) => dirSize + child.size,
        0
      )
    }
  }
  return fileSystem
}

fs = calculateSize(fs)

let total = 0

const getTotal = (fileSystem) => {
  for (let node of fileSystem) {
    if (node.type === 'dir') {
      getTotal(node.children)
      if (node.size <= 100000) total += node.size
    }
  }
  return total
}

getTotal(fs)
log(total)
