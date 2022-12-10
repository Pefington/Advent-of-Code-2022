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

const moveNext = (head, tail, direction) => {
  let [headX, headY] = JSON.parse(JSON.stringify(head))
  let [tailX, tailY] = JSON.parse(JSON.stringify(tail))

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
  let tailPositions = []

  for (let move of moves) {
    const [direction, distance] = move

    for (let d = 0; d < distance; d++) {
      rope[length - 1] = moveHead(rope[length - 1], direction)

      for (let i = length - 1; i > 0; i -= 1) {
        rope[i - 1] = moveNext(rope[i], rope[i - 1], direction)
        tailPositions.push( `${rope[0][0]}|${rope[0][1]}` )
        log(tailPositions[tailPositions.length - 1])
      }
    }
  }
  // tailPositions = [...new Set(tailPositions)]
  // log(tailPositions, tailPositions.length)
}

run2(moves, 10)
