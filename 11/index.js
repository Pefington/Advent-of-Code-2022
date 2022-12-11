import input from './input.json' assert { type: 'json' }

const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40))

//Part 1
const run1 = (rounds) => {
  const monkeys = input
  let inspections = []

  for (let monkey of monkeys) {
    monkey.inspected = 0
  }

  for (let round = 1; round <= rounds; round++) {
    for (let monkey of monkeys) {
      while (monkey.items.length > 0) {
        let item = monkey.items[0]
        monkey.inspected += 1
        item = eval(monkey.operation)
        item = Math.floor(item / 3)

        if (item % monkey.test === 0) {
          monkeys[monkey.true].items.push(item)
          monkey.items.shift()
        } else {
          monkeys[monkey.false].items.push(item)
          monkey.items.shift()
        }
      }
    }
  }

  for (let monkey of monkeys) {
    inspections.push(monkey.inspected)
  }
  let monkeyBusiness = inspections.sort((a, b) => b - a).slice(0, 2)
  monkeyBusiness = monkeyBusiness[0] * monkeyBusiness[1]
  log(monkeyBusiness)
  return monkeyBusiness
}

// run1(20)

//Part 2

const run2 = (rounds) => {
  const monkeys = input
  let inspections = []
  let divisors = []

  for (let monkey of monkeys) {
    monkey.inspected = 0
    divisors.push(monkey.test)
  }

  const lcm = divisors.reduce((a, b) => a * b)
  log(lcm)

  for (let round = 1; round <= rounds; round++) {
    for (let monkey of monkeys) {
      while (monkey.items.length > 0) {
        let item = monkey.items[0]
        if ( item > lcm ) item = item % lcm
        monkey.inspected += 1
        item = eval(monkey.operation)

        if (item % monkey.test === 0) {
          monkeys[monkey.true].items.push(item)
          monkey.items.shift()
        } else {
          monkeys[monkey.false].items.push(item)
          monkey.items.shift()
        }
      }
    }
    if (round === 1 || round === 20 || round === 1000 || round % 1000 === 0)
      log(round, monkeys)
  }

  for (let monkey of monkeys) {
    inspections.push(monkey.inspected)
  }
  let monkeyBusiness = inspections.sort((a, b) => b - a).slice(0, 2)
  monkeyBusiness = monkeyBusiness[0] * monkeyBusiness[1]
  log(monkeyBusiness)
  return monkeyBusiness
}

run2(10000)
