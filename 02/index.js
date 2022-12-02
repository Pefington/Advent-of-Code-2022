import rounds from './input.json' assert { type: 'json' }

//Part 1
const outcomes = {
  AX: 1 + 3,
  BX: 1 + 0,
  CX: 1 + 6,
  AY: 2 + 6,
  BY: 2 + 3,
  CY: 2 + 0,
  AZ: 3 + 0,
  BZ: 3 + 6,
  CZ: 3 + 3,
}

const scores = rounds.map((round) => outcomes[round])
console.log(scores.reduce((totalScore, score) => totalScore + score))

//Part 2
//X lose, Y draw, Z win
const newOutcomes = {
  AZ: 2 + 6,
  BZ: 3 + 6,
  CZ: 1 + 6,
  AY: 1 + 3,
  BY: 2 + 3,
  CY: 3 + 3,
  AX: 3 + 0,
  BX: 1 + 0,
  CX: 2 + 0,
}

const newScores = rounds.map((round) => newOutcomes[round])
console.log(newScores.reduce((totalScore, score) => totalScore + score))
