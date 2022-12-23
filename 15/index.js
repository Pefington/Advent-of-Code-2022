import fs from 'fs';
import util from 'util';

// Part 1
let raw = fs
  .readFileSync('./input.txt', 'utf8')
  .split('---')
  .map((line) => line.split('\n').filter(Boolean));

const [example, actual] = raw;

let input = actual.map((line) =>
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

function count(data, targetY) {
  let targetLine = new Set()
  data.forEach((line) => {
    const [x, y, xB, yB] = [...line.map((str) => parseInt(str, 10))];
    const distance = Math.abs(yB - y) + Math.abs(xB - x);

    if (
      (y <= targetY && y + distance >= targetY) ||
      (y >= targetY && y - distance <= targetY)
    ) {
      const xSpread = Math.abs( distance - Math.abs( targetY - y ) );
      const [minSpread, maxSpread] = [x - xSpread, x + xSpread]
      for ( let val = minSpread; val <= maxSpread; val += 1 ) {
        if (!(yB === targetY && val === xB)) targetLine.add( val )
      }
    }
  });
  console.log(targetLine.size)
}

count(input, 2000000);
