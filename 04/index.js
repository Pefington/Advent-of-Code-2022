import pairs from './input.json' assert { type: 'json' }

//Part 1
let pairLeft = []
let pairRight = []
for (let pair of pairs) {
  pairLeft.push(pair[0].split('-'))
  pairRight.push(pair[1].split('-'))
}

let expandedLeft = []
for (let i = 0, max = pairLeft.length; i < max; i++) {
  let tmp = []
  for (let j = parseInt(pairLeft[i][0]); j <= pairLeft[i][1]; j++) {
    tmp.push(j)
  }
  expandedLeft.push(tmp)
}

let expandedRight = []
for (let i = 0, max = pairRight.length; i < max; i++) {
  let tmp = []
  for (let j = parseInt(pairRight[i][0]); j <= pairRight[i][1]; j++) {
    tmp.push(j)
  }
  expandedRight.push(tmp)
}

let overlapFully = 0
let overlapAtAll = 0

for (let i = 0, max = expandedLeft.length; i < max; i++) {
  const longest =
    expandedLeft[i].length >= expandedRight[i].length
      ? expandedLeft[i]
      : expandedRight[i]
  const shortest =
    expandedLeft[i].length < expandedRight[i].length
      ? expandedLeft[i]
      : expandedRight[i]

  if (shortest.some((val) => longest.includes(val))) {
    overlapAtAll++
    if (shortest.every((val) => longest.includes(val))) {
      overlapFully++
    }
  }
}

const part1 = `  Part 1: ${overlapFully}`
const part2 = `  Part 2: ${overlapAtAll}`

export default [part1, part2]
