import input from './input.json' assert { type: 'json' }
import util from 'util'
import Table from 'cli-table'

const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */))

//Part 1
const moves = input.map((line) => line.split(' '))
for (let move of moves) {
  move[1] = parseInt(move[1])
}

const run = (moves) => {
  let headX = 0
  let headY = 0

  let tailX = 0
  let tailY = 0

  let tailVisited = ['0|0']

  for (let move of moves) {
    const [dir, dist] = move

    for (let i = 0; i < dist; i++) {
      switch (dir) {
        case 'U':
          headY += 1
          if (Math.abs(headY - tailY) > 1) {
            tailY = headY - 1
            tailX = headX
          }
          break
        case 'D':
          headY -= 1
          if (Math.abs(tailY - headY) > 1) {
            tailY = headY + 1
            tailX = headX
          }
          break
        case 'L':
          headX -= 1
          if (Math.abs(tailX - headX) > 1) {
            tailX = headX + 1
            tailY = headY
          }
          break
        case 'R':
          headX += 1
          if (Math.abs(headX - tailX) > 1) {
            tailX = headX - 1
            tailY = headY
          }
          break
        default:
          throw new Error(`Invalid direction: ${dir}`)
      }
      tailVisited.push(`${tailX}|${tailY}`)
    }
  }
  const visitedPositions = [...new Set(tailVisited)]
  log(visitedPositions.length)
  return visitedPositions.length
}

// run(moves)

//Part 2

const debugRope = (rope) => {
  let table = new Table({
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: '',
    },
  })
  for (let i = 0; i < 23; i++) {
    table.push(new Array(30).fill('.'))
  }
  let height = table.length

  table[height - 5 - 1][11] = 's'

  for (let i = 0, max = rope.length - 1; i < max; i++) {
    let [x, y] = rope[i]
    table[height - y - 1][x] = max - i
  }

  let [headX, headY] = rope[rope.length - 1]
  table[height - headY - 1][headX] = 'H'

  console.log('\n\n')
  console.log(table.toString(), '\n\n')
}

const moveHead = (head, direction) => {
  let headCopy = JSON.parse(JSON.stringify(head))
  switch (direction) {
    case 'U':
      headCopy[1] += 1
      break
    case 'D':
      headCopy[1] -= 1
      break
    case 'L':
      headCopy[0] -= 1
      break
    case 'R':
      headCopy[0] += 1
      break
    default:
      throw new Error(`Invalid direction: ${direction}`)
  }
  return headCopy
}

const moveNext = (head, tail) => {
  let [headX, headY] = JSON.parse(JSON.stringify(head))
  let [tailX, tailY] = JSON.parse(JSON.stringify(tail))

  if (headY - tailY > 1 && headX - tailX > 1) {
    tailY = headY - 1
    tailX = headX - 1
  } else if (headY - tailY > 1 && headX - tailX < -1) {
    tailY = headY - 1
    tailX = headX + 1
  } else if (headY - tailY < -1 && headX - tailX > 1) {
    tailY = headY + 1
    tailX = headX - 1
  } else if (headY - tailY < -1 && headX - tailX < -1) {
    tailY = headY + 1
    tailX = headX + 1
  } else if (headY - tailY > 1) {
    tailY = headY - 1
    tailX = headX
  } else if (tailY - headY > 1) {
    tailY = headY + 1
    tailX = headX
  } else if (headX - tailX > 1) {
    tailX = headX - 1
    tailY = headY
  } else if (tailX - headX > 1) {
    tailX = headX + 1
    tailY = headY
  }

  return [tailX, tailY]
}

const run2 = (moves, length) => {
  let rope = new Array(length).fill([11, 5])
  let tailPositions = []

  for (let move of moves) {
    const [direction, distance] = move

    for (let d = 0; d < distance; d++) {
      rope[length - 1] = moveHead(rope[length - 1], direction)

      for (let i = length - 1; i > 0; i -= 1) {
        // log(move)
        // debugRope(rope)
        rope[i - 1] = moveNext(rope[i], rope[i - 1], direction)
        tailPositions.push(`${rope[0][0]}|${rope[0][1]}`)
      }
    }
  }
  // debugRope(rope)
  tailPositions = [...new Set(tailPositions)]
  log(tailPositions, tailPositions.length)
}

run2(moves, 10)
// 2660 wrong ??
// Works fine with the example, but not with my input. I'm not sure what I'm doing wrong.
