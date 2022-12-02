import elves from './input.json' assert { type: 'json' }

//Part 1
const totals = elves.map((elf) =>
  elf.reduce((totalCals, snackCals) => totalCals + snackCals, 0)
)
console.log(Math.max(...totals))

//Part 2
totals.sort((a, b) => b - a)
console.log(
  totals.slice(0, 3).reduce((totalCals, elfCals) => totalCals + elfCals)
)
