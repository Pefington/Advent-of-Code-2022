/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import fs from 'fs';
import { parse } from 'path';
import util from 'util';

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */));
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40));

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

const example = raw[0]
const actual = raw[1]

