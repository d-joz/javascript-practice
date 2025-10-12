function color(text) {
  const code = Math.round((Math.random() * 6)+9);
  return "\x1B[38;5;" + code + "m" + text + "\x1B[0m";
}

function randomFilledCircle(x, y, r) {
  return r.includes((x ** 2) + (y ** 2));
}

function fireWorkRadius(r) {
  const radii = [];
  for (let index = 1; index <= (r ** 2) / 3; index++) {
    radii.push(Math.floor(Math.random() * (r ** 2)))
  }
  return radii;
}

function lineToOrigin(x, y, a) {
  return x === 0 && y === 15 - a;
}

function delay(multiplier = 3) {
  for (let index = 0; index < multiplier * 100000000; index++) { }
}

function convertToString(xyPlane) {
  const graph = [];
  for (let index = 0; index < xyPlane.length; index++) {
    graph.push(xyPlane[index].join(' '));
  }

  return (graph.join('\n'));
}

function generateXYPlane(n) {
  const xLine = ' '.repeat(n);
  const xyPlane = [];
  for (let index = 0; index < n; index++) {
    xyPlane.push(xLine.split(''));
  }
  return xyPlane;
}

function plot(size, eqn, char = '*') {
  const n = 37;
  const offSet = Math.floor(n / 2);

  const xyPlane = generateXYPlane(n);

  for (let index = 0; index < xyPlane.length ** 2; index++) {
    const x = index % n;
    const y = (index - x) / n;

    const offSettedX = x - offSet;
    const offSettedY = y - offSet;

    xyPlane[y][x] = eqn(offSettedX, offSettedY, size) ? char : ' ';
  }

  return xyPlane;
}

function bangAnimation(end, char) {
  for (let index = 0; index < end; index++) {
    console.clear();
    const graph = plot(fireWorkRadius(index), randomFilledCircle, char);
    console.log(convertToString(graph));
    delay((index / end) * 2);
  }
}
function dotMovingAnimation(end, char) {
  for (let index = 0; index !== end; index++) {
    console.clear();
    const graph = plot(index, lineToOrigin, char);
    console.log(convertToString(graph));
    delay(2);
  }
}

function main() {
  while (true) {
    dotMovingAnimation(15)
    bangAnimation(15, color('o'));
  }
}

main();
