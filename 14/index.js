import { clear } from 'console';
import fs from 'fs';
import util from 'util';

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */));
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40));
const draw = (grid) => {
  grid.forEach((arr) => console.log(arr.join('')));
  console.log('\n'.repeat(22));
};

// Part 1
let raw = fs
  .readFileSync('./input.txt', 'utf8')
  .split('---')
  .map((line) => line.split('\n').filter(Boolean));

raw = raw.map((block) =>
  block
    .map((chain) => chain.split('->'))
    .map((line) =>
      line.map((pair) => pair.split(',').map((str) => parseInt(str, 10)))
    )
);

const example = raw[0];
const actual = raw[1];

const input = actual; // * Switch when ready

const yVals = [];
input.forEach((line) => line.forEach((pair) => yVals.push(pair[1])));
let yLength = Math.max(...yVals) + 1;

const xVals = [];
input.forEach((line) => line.forEach((pair) => xVals.push(pair[0])));
let xLength = Math.max(...xVals) - Math.min(...xVals) + 1;
const xOffset = Math.min(...xVals);

const grid = JSON.parse(
  JSON.stringify(Array(yLength).fill(Array(xLength).fill('.')))
);

input.forEach((line) => {
  for (let pair = 0, max = line.length; pair < max - 1; pair += 1) {
    if (line[pair][0] === line[pair + 1][0]) {
      const x = line[pair][0] - xOffset;
      const start = line[pair][1];
      const end = line[pair + 1][1];
      const up = end - start > 0;
      for (let y = start; up ? y <= end : y >= end; up ? (y += 1) : (y -= 1)) {
        grid[y][x] = '#';
      }
    } else {
      const y = line[pair][1];
      const start = line[pair][0] - xOffset;
      const end = line[pair + 1][0] - xOffset;
      const up = end - start > 0;
      for (let x = start; up ? x <= end : x >= end; up ? (x += 1) : (x -= 1)) {
        grid[y][x] = '#';
      }
    }
  }
});

// log(yLength, xLength);
// draw(grid);
let emitter = 500 - xOffset;

function run1() {
  grid[0][emitter] = '+';
  let full = false;
  let atRest = 0;

  while (!full) {
    let y = 0;
    let x = emitter;
    let rest = false;
    while (!rest) {
      if (y + 1 === yLength) {
        grid[y][x] = '.';
        full = true;
        break;
      } else if (grid[y + 1][x] === '.') {
        grid[y][x] = '.';
        grid[y + 1][x] = 'o';
      } else if (x === 0) {
        grid[y][x] = '.';
        full = true;
        break;
      } else if (grid[y + 1][x - 1] === '.') {
        grid[y][x] = '.';
        grid[y + 1][x - 1] = 'o';
        x -= 1;
      } else if (x === xLength - 1) {
        grid[y][x] = '.';
        full = true;
        break;
      } else if (grid[y + 1][x + 1] === '.') {
        grid[y][x] = '.';
        grid[y + 1][x + 1] = 'o';
        x += 1;
      } else {
        rest = true;
        atRest += 1;
      }
      y += 1;
      grid[0][emitter] = '+';
      // draw(grid);
    }
    draw(grid);
  }
  grid[0][emitter] = '+';
  log(atRest);
}

// run1()

// ! Part 2
grid.push(Array(xLength).fill('.'));
grid.push(Array(xLength).fill('.'));
grid.unshift(Array(xLength).fill('.'));
grid.unshift(Array(xLength).fill('.'));

grid.forEach((line) => {
  emitter = 500 - xOffset;
  while (line.length < yLength * 3) {
    line.push('.');
    line.unshift('.');
    emitter += 1;
  }
});

xLength = grid[0].length;
yLength = grid.length;

for (let i = 0; i < xLength; i += 1) grid[yLength - 1][i] = '#';

// draw(grid);
// log(emitter)

function run2() {
  grid[0][emitter] = '+';
  let full = false;
  let atRest = 0;

  // draw(grid);

  while (!full) {
    let y = 0;
    let x = emitter;
    let rest = false;
    while (!rest) {
      if (grid[y + 1][x] === '.') {
        grid[y][x] = '.';
        grid[y + 1][x] = 'o';
      } else if (grid[y + 1][x - 1] === '.') {
        grid[y][x] = '.';
        grid[y + 1][x - 1] = 'o';
        x -= 1;
      } else if (grid[y + 1][x + 1] === '.') {
        grid[y][x] = '.';
        grid[y + 1][x + 1] = 'o';
        x += 1;
      } else {
        rest = true;
        atRest += 1;
        if (grid[2][emitter] === 'o') full = true;
      }
      y += 1;
    }
  }
  console.clear();
  draw(grid);
  log(atRest);
}

run2();
