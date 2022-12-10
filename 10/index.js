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

// run1(instructions)

//Part 2

const run2 = (instructions) => {
  let cycle = 1
  let x = 1
  let screen = []
  let line = []

  const cycleOne = (instruction) => {
    let position = (cycle - 1) % 40
    let sprite = '.'.repeat(40)

    if (x === -1) {
      sprite = '#' + '.'.repeat(39)
    } else if (x === 0) {
      sprite = '##' + '.'.repeat(38)
    } else if (x > 0 && x < 39) {
      sprite = '.'.repeat(x - 1) + '###' + '.'.repeat(39 - x)
    } else if (x === 39) {
      sprite = '.'.repeat(38) + '##'
    } else if (x === 40) {
      sprite = '.'.repeat(39) + '#'
    }

    line.push( sprite[position] )
    console.log(`Cycle ${cycle}: ${instruction}`)
    console.log(`Sprite position: ${sprite}\n`)
    console.log(`CRT draws pixel in position ${position}`)
    console.log(line.join(''))
    if (position === 39) {
      screen.push(line.join(''))
      line = []
      console.log(screen)
    }
    cycle += 1
  }

  for (let instruction of instructions) {
    if (instruction[0] === 'addx') {
      cycleOne(instruction)
      cycleOne(instruction)
      x += instruction[1]
    } else cycleOne(instruction)
  }
  log(screen)
}

run2(instructions)
