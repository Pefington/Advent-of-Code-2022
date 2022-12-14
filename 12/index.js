/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import fs from 'fs';
import util from 'util';

// eslint-disable-next-line no-unused-vars
const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */));
// eslint-disable-next-line no-unused-vars
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40));

// Part 1
const input = fs.readFileSync('./input.txt', 'utf8').split('\n\n');
const example = input[0].split('\n').map((row) => row.split(''));
// const actual = input[1].split("\n").map((row) => row.split(""));

const terrain = example;

// Get the start and end coords
const getCoords = (grid, char) => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      if (grid[y][x] === char) {
        return [x, y];
      }
    }
  }
  throw new Error(`Could not find ${char} in grid`);
};
const start = getCoords(terrain, 'S');
const end = getCoords(terrain, 'E');

const shortestPath = (grid, origin, destination) => {};

const x = 'c';
