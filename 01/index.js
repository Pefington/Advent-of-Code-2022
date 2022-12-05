import elves from './input.json' assert { type: 'json' }

console.log('DAY 01')

//Part 1
const totals = elves.map((elf) =>
  elf.reduce((totalCals, snackCals) => totalCals + snackCals)
)
const part1 = `  Part 1: ${Math.max(...totals)}`

//Part 2
totals.sort((a, b) => b - a)
const part2 = `  Part 2: ${totals
  .slice(0, 3)
  .reduce((totalCals, elfCals) => totalCals + elfCals)}`

export default [part1, part2]
