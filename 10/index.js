import input from './input.json' assert { type: 'json' }

const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1
const instructions = input.map((instruction) => instruction.split(' '))
for (let instruction of instructions) {
  instruction[0] === 'addx' && (instruction[1] = parseInt(instruction[1]))
}

const checkSignal = (cycle, x, strengths) => {
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    strengths.push(x * cycle)
    console.log(strengths)
  }
}

const calculateFinalStrength = (strengths) => {
  return strengths.reduce((acc, strength) => acc + strength, 0)
}

const run1 = (instructions) => {
  let cycle = 0
  let x = 1
  let strength = 0
  let strengths = []

  for (let instruction of instructions) {
    if (instruction[0] === 'addx') {
      cycle += 1
      checkSignal(cycle, x, strengths)
      console.log(`Cycle ${cycle}: ${x}`)
      cycle += 1
      console.log(`Cycle ${cycle}: ${x}`)
      checkSignal(cycle, x, strengths)
      x += instruction[1]
    } else if (instruction[0] === 'noop') {
      cycle += 1
      console.log(`Cycle ${cycle}: ${x}`)
      checkSignal(cycle, x, strengths)
    } else throw new Error(`Unknown instruction: ${instruction}`)
  }
  const finalStrength = calculateFinalStrength(strengths)
  log(`Final strength: ${finalStrength}`)
  return finalStrength
}

run1( instructions )

//Part 2
