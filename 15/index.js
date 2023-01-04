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

const coordinates = [];
const sensors = new Set();
const beacons = new Set();

input.forEach((line) => {
  const [xS, yS, xB, yB] = [...line.map((str) => parseInt(str, 10))];
  const sensor = [xS, yS];
  const beacon = [xB, yB];
  const distance = Math.abs(yB - yS) + Math.abs(xB - xS);
  coordinates.push([sensor, beacon, distance]);
  sensors.add(`${xS} ${yS}`);
  beacons.add(`${xB} ${yB}`);
});

function countPositions(targetY) {
  const targetLine = new Set();
  coordinates.forEach((triplet) => {
    const [xS, yS] = triplet[0];
    const [xB, yB] = triplet[1];
    const distance = triplet[2];

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
  console.log(targetLine.size, '\n');
}

// countPositions(2000000);

// * Part 2
function getFrequency(limit) {
  const polygons = [];
  coordinates.forEach((triplet) => {
    const [x, y] = triplet[0];
    const d = triplet[2];
    polygons.push([
      [x - d, y],
      [x, y + d],
      [x + d, y],
      [x, y - d],
    ]);
  });
  const westNorth = [];
  const northEast = [];
  const eastSouth = [];
  const southWest = [];
  polygons.forEach((poly) => {
    const [xWest, yWest] = poly[0];
    const [xNorth, yNorth] = poly[1];
    const [xEast, yEast] = poly[2];
    const [xSouth, ySouth] = poly[3];
    let [x, y] = [xWest, yWest]
    westNorth.push(`${x} ${y}`);
    while ( `${x} ${y}` !== `${xNorth} ${yNorth}` ) {
      x += 1;
      y += 1;
      westNorth.push(`${x} ${y}`);
    }
    [x, y] = [xNorth, yNorth]
    northEast.push(`${x} ${y}`);
    while (`${x} ${y}` !== `${xEast} ${yEast}`) {
      x += 1;
      y -= 1;
      northEast.push(`${x} ${y}`);
    }
    [x, y] = [xEast, yEast]
    eastSouth.push(`${x} ${y}`);
    while (`${x} ${y}` !== `${xSouth} ${ySouth}`) {
      x -= 1;
      y -= 1;
      eastSouth.push(`${x} ${y}`);
    }
    [x, y] = [xSouth, ySouth]
    southWest.push(`${xSouth} ${ySouth}`);
    while (`${x} ${y}` !== `${xWest} ${yWest}`) {
      x -= 1;
      y += 1;
      southWest.push(`${xSouth} ${ySouth}`);
    }
  });
  console.log(westNorth);
  console.log(northEast);
  console.log(eastSouth);
  console.log(southWest);
}

// getFrequency(20);
getFrequency(4000000);
