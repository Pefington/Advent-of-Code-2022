import input from './input.json' assert { type: 'json' }
import util from 'util'

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

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
// inspect(fs)

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

getTotal( fs )

//Part 2

// Your puzzle answer was 1443806.

// The first half of this puzzle is complete! It provides one gold star: *
// --- Part Two ---

// Now, you're ready to choose a directory to delete.

// The total disk space available to the filesystem is 70000000. To run the update, you need unused space of at least 30000000. You need to find a directory you can delete that will free up enough space to run the update.

// In the example above, the total size of the outermost directory (and thus the total amount of used space) is 48381165; this means that the size of the unused space must currently be 21618835, which isn't quite the 30000000 required by the update. Therefore, the update still requires a directory with total size of at least 8381165 to be deleted before it can run.

// To achieve this, you have the following options:

//     Delete directory e, which would increase unused space by 584.
//     Delete directory a, which would increase unused space by 94853.
//     Delete directory d, which would increase unused space by 24933642.
//     Delete directory /, which would increase unused space by 48381165.

// Directories e and a are both too small; deleting them would not free up enough space. However, directories d and / are both big enough! Between these, choose the smallest: d, increasing unused space by 24933642.

// Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?

const actualTotal = fs[0].size

const totalDiskSpace = 70000000
const neededSpace = 30000000
const freeSpace = totalDiskSpace - actualTotal
const targetSize = neededSpace - freeSpace

const matchingSizes = []

const getSize = (fileSystem) => {
  for (let node of fileSystem) {
    if (node.type === 'dir') {
      getSize(node.children)
      if (node.size >= targetSize) matchingSizes.push(node.size)
    }
  }
  return matchingSizes.sort((a, b) => a - b)[0]
}

log(getSize(fs))
