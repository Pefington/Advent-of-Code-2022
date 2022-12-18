/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import fs from 'fs';
import util from 'util';

const inspect = (obj) =>
  console.log(util.inspect(obj, false, null, true /* enable colors */));
const log = (...args) => console.log('\n', ...args, '\n\n', '-'.repeat(40));

// Part 1
const raw = fs.readFileSync('./input.txt', 'utf8').split('---');
const example = raw[0].split('\n').filter(Boolean);
const actual = raw[1].split('\n').filter(Boolean);

const input = actual; // * Switch when ready

const left = [];
const right = [];

input.forEach((line, index) => {
  if (index % 2 === 0) {
    left.push(JSON.parse(line));
  } else {
    right.push(JSON.parse(line));
  }
});

const isInt = (el) => typeof el === 'number';
const isArr = (el) => Array.isArray(el);

function checkPair(x, y) {
  if (isInt(x) && isInt(y)) return x - y;
  if (isInt(x) && isArr(y)) return checkPair([x], y);
  if (isArr(x) && isInt(y)) return checkPair(x, [y]);

  const max = Math.min(x.length, y.length);
  for (let i = 0; i < max; i += 1) {
    const valid = checkPair(x[i], y[i]);
    if (valid) return valid;
  }
  return x.length - y.length;
}

function run1(lInput, rInput) {
  const validPairs = [];
  for (let i = 0, max = lInput.length; i < max; i += 1) {
    if (checkPair(lInput[i], rInput[i]) < 0) {
      validPairs.push(i + 1);
    }
  }
  const res = validPairs.reduce((sum, i) => sum + i);
  log(res);
  return res;
}

// run1( left, right );

// Part 2
function run2(array) {
  const fullInput = [];
  array.forEach((line) => fullInput.push(JSON.parse(line)));

  fullInput.push([[2]], [[6]]);
  fullInput.sort((a, b) => checkPair(a, b));

  const stringInput = [];
  fullInput.forEach((line) => stringInput.push(JSON.stringify(line)));
  log((stringInput.indexOf('[[2]]') + 1) * (stringInput.indexOf('[[6]]') + 1));
}

run2(input);
