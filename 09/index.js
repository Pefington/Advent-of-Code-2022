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

  let tailVisited = [[0, 0]]

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
      tailVisited.push([tailX, tailY])
    }
  }
  const visitedPositions = [...new Set(tailVisited.map((pos) => JSON.stringify(pos)))]
  log( visitedPositions, visitedPositions.length )
  return visitedPositions.length
}

run(moves)
