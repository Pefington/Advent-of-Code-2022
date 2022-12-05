import input from './input.json' assert { type: 'json' }

//Part 1
let stacks = input.slice(0, 3)
let rest = input.slice(3)

let instructions = rest.map((instruction) =>
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
for ( let stack of stacks ) {
  result1.push(stack.pop())
}
result1 = result1.join('')

const part1 = `  Part 1: ${result1}`
console.log(part1)
// const part2 = `  Part 2: ${overlapAtAll}`

// export default ['Day 04:', part1, part2]
