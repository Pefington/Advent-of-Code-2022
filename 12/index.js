import fs from 'fs';

// eslint-disable-next-line no-console
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40));

const input = fs.readFileSync('./input.txt', 'utf8').split('\n\n');
// eslint-disable-next-line no-unused-vars
const example = input[0].split('\n').map((row) => row.split(''));
const actual = input[1]
  .split('\n')
  .map((row) => row.split(''))
  .filter((row) => row.length);

const terrain = actual;

let start = null;
let end = null;

// Part 1 => Had to look at a python solution for this one, never done graphs before.

for (let row = 0, maxRow = terrain.length; row < maxRow; row += 1) {
  for (let col = 0, maxCol = terrain[row].length; col < maxCol; col += 1) {
    if (terrain[row][col] === 'S') {
      start = [row, col];
      terrain[row][col] = 'a';
    }
    if (terrain[row][col] === 'E') {
      end = [row, col];
      terrain[row][col] = 'z';
    }
  }
}

const queue = [[start[0], start[1], 0]];
const visited = new Set([start.toString()]);

while (queue.length) {
  const [row, col, distance] = queue.shift();
  const moves = [
    [row + 1, col],
    [row - 1, col],
    [row, col + 1],
    [row, col - 1],
  ];

  moves.forEach((move) => {
    if (
      !visited.has(move.toString()) &&
      move[0] >= 0 &&
      move[0] < terrain.length &&
      move[1] >= 0 &&
      move[1] < terrain[0].length
    ) {
      if (
        terrain[move[0]][move[1]].charCodeAt(0) <=
        terrain[row][col].charCodeAt(0) + 1
      ) {
        if (move.toString() === end.toString()) {
          log(distance + 1);
          return;
        }
        visited.add(move.toString());
        queue.push([move[0], move[1], distance + 1]);
      }
    }
  });
}

// Part 2

for (let row = 0, maxRow = terrain.length; row < maxRow; row += 1) {
  for (let col = 0, maxCol = terrain[row].length; col < maxCol; col += 1) {
    if (terrain[row][col] === 'E') {
      start = [row, col];
      terrain[row][col] = 'z';
    }
  }
}

const queue2 = [[start[0], start[1], 0]];
const visited2 = new Set([start.toString()]);

while (queue2.length) {
  const [row, col, distance] = queue2.shift();
  const moves = [
    [row + 1, col],
    [row - 1, col],
    [row, col + 1],
    [row, col - 1],
  ];

  moves.forEach((move) => {
    if (
      !visited2.has(move.toString()) &&
      move[0] >= 0 &&
      move[0] < terrain.length &&
      move[1] >= 0 &&
      move[1] < terrain[0].length
    ) {
      if (
        terrain[row][col].charCodeAt(0) <=
        terrain[move[0]][move[1]].charCodeAt(0) + 1
      ) {
        if (terrain[move[0]][move[1]] === 'a') {
          log(distance + 1);
          process.exit();
        }
        visited2.add(move.toString());
        queue2.push([move[0], move[1], distance + 1]);
      }
    }
  });
}
