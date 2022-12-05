import rucksacks from './input.json' assert { type: 'json' }

//Part 1
for (let i = 0, length = rucksacks.length; i < length; i++) {
  const halfLength = rucksacks[i].length / 2
  rucksacks[i] = [
    rucksacks[i].slice(0, halfLength),
    rucksacks[i].slice(halfLength),
  ]
}

let prioritiesSum = 0

for (let rucksack of rucksacks) {
  for (let item of rucksack[0]) {
    if (rucksack[1].includes(item)) {
      prioritiesSum +=
        item.toUpperCase() === item
          ? item.charCodeAt(0) - 38
          : item.charCodeAt(0) - 96
      break
    }
  }
}

//Part 2
let groupsSum = 0

for (let i = 0, length = rucksacks.length; i < length; i += 3) {
  for (let item of rucksacks[i].join('')) {
    if (
      rucksacks[i + 1].join('').includes(item) &&
      rucksacks[i + 2].join('').includes(item)
    ) {
      groupsSum +=
        item.toUpperCase() === item
          ? item.charCodeAt(0) - 38
          : item.charCodeAt(0) - 96
      break
    }
  }
}

const part1 = `  Part 1: ${prioritiesSum}`
const part2 = `  Part 2: ${groupsSum}`

export default [part1, part2]
