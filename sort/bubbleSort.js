let iterationCount = 0;

function padNumber(num, length = 10) {
  return num.toString().padEnd(length);
}

function sort(data) {
  const sorted = data.slice();

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      iterationCount++;
      if (sorted[i] > sorted[j]) {
        const temp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = temp;
      }
    }
  }
  return sorted;
}

function randomNumber(lower, upper) {
  return lower + (Math.round(Math.random() * (upper - lower)))
}

function getRandomData(length) {
  const data = [];

  for (let index = 0; index < length; index++) {
    data.push(randomNumber(0, 50))
  }

  return data;
}

function benchmark(length) {
  const data = getRandomData(length);
  iterationCount = 0;
  sort(data);
  console.log(`| ${padNumber(length)} | ${padNumber(iterationCount)} |`);
}

function main() {
  benchmark(10);
  benchmark(100);
  benchmark(1000);
}

main()