import input from './input.json' assert { type: 'json' }

//Part 1
const checkSequence = (size) => {
  const sequence = input[0]
  for (let i = 0, max = sequence.length; i < max; i++) {
    let chunk = []
    for (let j = 0; j < size; j++) {
      chunk.push(sequence[i + j])
      if (new Set(chunk).size === size) { // Check for duplicate(s)
        return i + size
      }
    }
  }
}

const part1 = checkSequence(3)

//Part 2
const part2 = checkSequence(14)

export default [part1, part2]
