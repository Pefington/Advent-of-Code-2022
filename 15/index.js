import fs from 'fs';

// * Part 1
const raw = fs
  .readFileSync('./input.txt', 'utf8')
  .split('---')
  .map((line) => line.split('\n').filter(Boolean));

// eslint-disable-next-line no-unused-vars
const [example, actual] = raw;

// const input = example.map((line) =>
  // !Swap above and below lines when ready
  const input = actual.map((line) =>
  line
    .split(' ')
    .filter((arr) => arr.includes('='))
    .map((el) =>
      el
        .split('')
        .filter((char) => char === '-' || !Number.isNaN(parseInt(char, 10)))
        .join('')
    )
);

const squares = []
const sensors = new Set()
const beacons = new Set()

input.forEach((line) => {
  const [xS, yS, xB, yB] = [...line.map( ( str ) => parseInt( str, 10 ) )];
  const sensor = [xS, yS]
  const beacon = [xB, yB]
  const distance = Math.abs(yB - yS) + Math.abs(xB - xS)
  squares.push([sensor, beacon, distance])
  sensors.add(`${xS} ${yS}`)
  beacons.add(`${xB} ${yB}`)
});

function countPositions(areas, targetY) {
  const targetLine = new Set();
  areas.forEach((square) => {
    const [xS, yS] = square[0]
    const [xB, yB] = square[1]
    const distance = square[2]

    if (
      (yS <= targetY && yS + distance >= targetY) ||
      (yS >= targetY && yS - distance <= targetY)
    ) {
      const xSpread = Math.abs(distance - Math.abs(targetY - yS));
      const [minSpread, maxSpread] = [xS - xSpread, xS + xSpread];
      for (let val = minSpread; val <= maxSpread; val += 1) {
        if (!(yB === targetY && val === xB)) targetLine.add(val);
      }
    }
  });
  // eslint-disable-next-line no-console
  console.log( targetLine.size, '\n' );
}

countPositions( squares, 2000000 );

console.log(squares)

// * Part 2
function getFrequency(data, limit) {}
// getFrequency(input, 4000000);
