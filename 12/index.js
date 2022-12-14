/* eslint-disable no-console */
import fs from "fs";
import util from "util";

// eslint-disable-next-line no-unused-vars
const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */));
// eslint-disable-next-line no-unused-vars
const log = (...args) => console.log("\n", ...args, "\n\n", "-".repeat(40));

// Part 1
const input = fs.readFileSync("./input.txt", "utf8").split("\n\n");
const example = input[0].split("\n").map((row) => row.split(""));
const actual = input[1].split("\n").map((row) => row.split(""));

const terrain = example;

// Get the start and end coords
const getCoords = (grid, char) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === char) {
        return [x, y];
      }
    }
  }
  throw new Error(`Could not find ${char} in grid`);
};
const start = getCoords(terrain, "S");
const end = getCoords(terrain, "E");

const adjacencyList = new Map();
const visited = new Set();

const addSquare = (x, y) => {
  adjacencyList.set(`${x},${y}`, []);
};

const addEdge = (x1, y1, x2, y2) => {
  adjacencyList.get(`${x1},${y1}`).push(`${x2},${y2}`);
  adjacencyList.get(`${x2},${y2}`).push(`${x1},${y1}`);
};

const buildGraph = (grid) => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const char = grid[y][x];
      if (char === "#") continue;
      addSquare(x, y);
      if (char === "S" || char === "E") continue;
      if (grid[y][x + 1] !== "#") addEdge(x, y, x + 1, y);
      if (grid[y + 1] && grid[y + 1][x] !== "#") addEdge(x, y, x, y + 1);
    }
  }
};
