import input from './input.json' assert { type: 'json' }

//Part 1
let stacks = JSON.parse(JSON.stringify(input)).slice(0, 9)
const rest = JSON.parse(JSON.stringify(input)).slice(9)

const instructions = rest.map((instruction) =>
  instruction.split(' ').filter((word) => parseInt(word))
)

for (let instruction of instructions) {
  for (
    let cratesToMove = instruction[0],
      stackFrom = stacks[instruction[1] - 1],
      stackTo = stacks[instruction[2] - 1];
    cratesToMove > 0;
    cratesToMove--
  ) {
    stackTo.push(stackFrom.pop())
  }
}

let result1 = []
for (let stack of stacks) {
  result1.push(stack.pop())
}
result1 = result1.join('')

//Part 2
stacks = JSON.parse(JSON.stringify(input)).slice(0, 9)

for (let instruction of instructions) {
  const tmp = []
  const stackFrom = stacks[instruction[1] - 1]
  const stackTo = stacks[instruction[2] - 1]
  for (let cratesToMove = instruction[0]; cratesToMove > 0; cratesToMove--) {
    tmp.push(stackFrom.pop())
  }
  for (let el of tmp.reverse()) {
    stackTo.push(el)
  }
}

let result2 = []
for (let stack of stacks) {
  result2.push(stack.pop())
}
result2 = result2.join('')

const part1 = `  Part 1: ${result1}`
const part2 = `  Part 2: ${result2}`

export default [part1, part2]
