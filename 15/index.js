import { clear } from 'console';
import fs from 'fs';
import util from 'util';

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */));
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40));

// Part 1
let raw = fs
  .readFileSync('./input.txt', 'utf8')
  .split('---')
  .map((line) => line.split('\n').filter(Boolean));

const [example, actual] = raw;

let input = example.map((line) =>
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

function draw(data) {
  let [yMin, yMax] = [0, 0];
  let [xMin, xMax] = [0, 0];

  data.forEach((line) => {
    yMin = Math.min(yMin, line[1], line[3]);
    yMax = Math.max(yMax, line[1], line[3]);
    xMin = Math.min(xMin, line[0], line[2]);
    xMax = Math.max(xMax, line[0], line[2]);
  });

  const yLength = yMax - yMin + 1;
  const xLength = xMax - xMin + 1;

  let grid = JSON.parse(JSON.stringify(Array(yLength).fill(Array(xLength).fill('.'))));

  data.forEach( line => {
    const [xS, yS, xB, yB] = [...line]
    grid[yS - yMin][xS - xMin] = 'S'
    grid[yB - yMin][xB - xMin] = 'B'
    // - ..Min offsets the coordinates to account for negative values
  })

  log(grid.map((line) => line.join('')));
}

draw(input);
