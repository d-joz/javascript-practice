function sort(data) {
  const sorted = data.slice();

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (sorted[i] > sorted[j]) {
        const temp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = temp;
      }
    }
  }
  return sorted;
}

function findMean(data) {
  let sum = 0;
  for (let index = 0; index < data.length; index++) {
    sum += data[index];
  }

  return sum / data.length;
}

function findMedian(data) {
  const sorted = sort(data);
  const mid = Math.floor(sorted.length / 2);

  return sorted[mid];;
}

function standardDeviationOf(data) {
  const mean = findMean(data);
  let variance = 0;
  for (let index = 0; index < data.length; index++) {
    variance += (mean - data[index]) ** 2;
  }

  return Math.sqrt(variance / data.length);
}

function viratStats() {
  const data = [59, 31, 7, 67, 22, 62, 1, 73, 70, 51, 62, 43, 54];

  const mean = findMean(data);
  const median = findMedian(data);
  const standardDeviation = standardDeviationOf(data);

  return [mean, median, standardDeviation];
}


function main() {
  const stats = viratStats();
  console.log(`\nmean: ${stats[0]} \nmedian: ${stats[1]} \nstandard deviation: ${stats[2]}\n`);
}

main()