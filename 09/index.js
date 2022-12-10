import input from './input.json' assert { type: 'json' }

const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

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

const moveHead = (head, direction) => {
  switch (direction) {
    case 'U':
      head[1] += 1
      break
    case 'D':
      head[1] -= 1
      break
    case 'L':
      head[0] -= 1
      break
    case 'R':
      head[0] += 1
      break
    default:
      throw new Error(`Invalid direction: ${direction}`)
  }
  return head
}

const moveNext = (head, tail, direction) => {
  let [headX, headY] = head
  let [tailX, tailY] = tail

  switch (direction) {
    case 'U':
      if (Math.abs(tailY - headY) > 1) {
        tailY = headY - 1
        tailX = headX
      }
      break
    case 'D':
      if (Math.abs(tailY - headY) > 1) {
        tailY = headY + 1
        tailX = headX
      }
      break
    case 'L':
      if (Math.abs(tailX - headX) > 1) {
        tailX = headX + 1
        tailY = headY
      }
      break
    case 'R':
      if (Math.abs(headX - tailX) > 1) {
        tailX = headX - 1
        tailY = headY
      }
      break
    default:
      throw new Error(`Invalid direction: ${direction}`)
  }
  return [tailX, tailY]
}

const run2 = (moves, length) => {
  let rope = new Array(length).fill([0, 0])

  for (let move of moves) {
    const [direction, distance] = move

    for (let d = 0; d < distance; d++) {
      moveHead(rope[length - 1], direction)
      log(rope[length - 1])
      log(rope)

      // for ( let i = length - 1; i > 0; i -= 1 ) {
      //   log(rope)
      //   rope[i - 1] = moveNext( rope[i], rope[i - 1], direction )
      //   log(rope)
      // }
    }
  }
}

// run2(moves, 10)
