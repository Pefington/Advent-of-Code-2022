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

const input = example; // * Switch when ready

const left = [];
const right = [];

input.forEach((line, index) => {
  if (index % 2 === 0) {
    left.push(JSON.parse(line));
  } else {
    right.push(JSON.parse(line));
  }
});

function checkPair(lVal, rVal) {
  return true;
}

function run1(lInput, rInput) {
  const validPairs = [];
  for (let i = 0, max = lInput.length; i < max; i += 1) {
    console.log(`\n== Pair ${i + 1} ==`);
    console.log('- Compare', lInput[i], 'vs', rInput[i]);
    if (checkPair(lInput[i], rInput[i])) {
      console.log('GOTTEM!!!');
      validPairs.push(i + 1);
    }
    log(validPairs);
  }
  const res = validPairs.reduce((sum, i) => sum + i);
  log(res);
  return res;
}

run1(left, right);
