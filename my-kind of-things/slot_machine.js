const BLUE_7 = color(':7:', 27, 1);
const GREEN_BAR = color('bar', 10);
const PINK_7 = color(':7:', 13, 1);
const TWO_X = color('~2x', 57, 1);
const RED_7 = color(':7:', 9, 1);
const YELLOW_BAR = color('bar', 11);

const REEl_TEMPLATE = createReelTemplate();
const PAY_TABLE = createPayTable();

function color(text, code, bold = '') {
  return "\x1B[" + bold + ";38;5;" + code + "m" + text + "\x1B[0m";
}

function delay(multiplier = 3) {
  for (let index = 0; index < multiplier * 100000000; index++) { }
}

function random(limit) {
  return Math.round(Math.random() * limit)
}

function convertToString(array) {
  const graph = [];
  for (let index = 0; index < array.length; index++) {
    graph.push(array[index].join(''));
  }

  return (graph.join('\n'));
}

function createReelTemplate() {
  const reelComponents = ['', BLUE_7, GREEN_BAR, PINK_7, TWO_X, RED_7, YELLOW_BAR].join(',   ,');
  const reelTemplate = reelComponents.repeat(2).split(',');
  reelTemplate.shift();
  return reelTemplate;
}

function createPayTable() {
  const topLine = '┏━━━━━━━━━━━━━━━━━┳━━━━━━┳━━━━━━┳━━━━━━┓';
  const title = '\n┃                 ┃  1x  ┃  2x  ┃  3x  ┃';
  const titleSeperator = '\n┣━━━━━┳━━━━━┳━━━━━╋━━━━━━╋━━━━━━╋━━━━━━┫';
  const seperator = '\n┣━━━━━╋━━━━━╋━━━━━╋━━━━━━╋━━━━━━╋━━━━━━┫';
  const anyLine = '\n┃ any ┃ any ┃ any ┃      ┃      ┃      ┃';
  const anyTop = '\n┣━━━━━┻━━━━━┻━━━━━╋━━━━━━╋━━━━━━╋━━━━━━┫';
  const anySeperator = '\n┣━━━━━━━━━━━━━━━━━╋━━━━━━╋━━━━━━╋━━━━━━┫';
  const bottomLine = '\n┗━━━━━━━━━━━━━━━━━┻━━━━━━┻━━━━━━┻━━━━━━┛';

  const payTable = [
    [topLine + title + titleSeperator],
    ['┃ ', TWO_X, ' ┃ ', TWO_X, ' ┃ ', TWO_X, ' ┃ ', 1200, ' ┃ ', 2400, ' ┃ ', 3600, ' ┃' + seperator], //1
    ['┃ ', RED_7, ' ┃ ', RED_7, ' ┃ ', RED_7, ' ┃ ', 100, '  ┃ ', 200, '  ┃ ', 300, '  ┃' + seperator], //2
    ['┃ ', PINK_7, ' ┃ ', PINK_7, ' ┃ ', PINK_7, ' ┃ ', 80, '   ┃ ', 160, '  ┃ ', 240, '  ┃' + seperator], //3
    ['┃ ', BLUE_7, ' ┃ ', BLUE_7, ' ┃ ', BLUE_7, ' ┃ ', 60, '   ┃ ', 120, '  ┃ ', 180, '  ┃' + seperator + anyLine], //4
    ['┃ ', ':7:', ' ┃ ', ':7:', ' ┃ ', ':7:', ' ┃ ', 30, '   ┃ ', 60, '   ┃ ', 90, '   ┃' + seperator], //5
    ['┃ ', YELLOW_BAR, ' ┃ ', YELLOW_BAR, ' ┃ ', YELLOW_BAR, ' ┃ ', 50, '   ┃ ', 100, '  ┃ ', 150, '  ┃' + seperator], //6
    ['┃ ', GREEN_BAR, ' ┃ ', GREEN_BAR, ' ┃ ', GREEN_BAR, ' ┃ ', 10, '   ┃ ', 20, '   ┃ ', 30, '   ┃' + seperator + anyLine], //7
    ['┃ ', 'bar', ' ┃ ', 'bar', ' ┃ ', 'bar', ' ┃ ', 5, '    ┃ ', 10, '   ┃ ', 15, '   ┃' + anyTop], //8
    ['┃ ', `any two ${TWO_X}`, '     ┃ ', '', '', 5, '    ┃ ', 10, '   ┃ ', 15, '   ┃' + anySeperator], //9
    ['┃ ', `any one ${TWO_X}`, '     ┃ ', '', '', 2, '    ┃ ', 4, '    ┃ ', 6, '    ┃' + bottomLine], //10
  ];
  return payTable;
}

function setSingleReel() {
  const result = [];
  for (let index = 0; index < 5; index++) {
    result.push(REEl_TEMPLATE[index + 1]);
  }
  return result;
}

function setReels() {
  const result = [];
  for (let index = 0; index < 3; index++) {
    result.push(setSingleReel());
  }
  return result;
}

function generateSlotMachine(totalPoints, pointsGot, pointsUsed, reel) {
  const slotMachine = [
    ['┏━━━━━━━━━━━━━━━━━┓'],
    ['┃ ┏━━━┓', '┏━━━┓', '┏━━━┓ ┃', '◉'],
    ['┃ ┃', reel[0][0], '┃┃', reel[1][0], '┃┃', reel[2][0], '┃ ┃', '┃'],
    ['┃ ┃', reel[0][1], '┃┃', reel[1][1], '┃┃', reel[2][1], '┃ ┃', '┃'],
    ['┃▶︎┃', reel[0][2], '┃┃', reel[1][2], '┃┃', reel[2][2], '┃◀︎┃', '┃'],
    ['┃ ┃', reel[0][3], '┃┃', reel[1][3], '┃┃', reel[2][3], '┃ ┣', '┛'],
    ['┃ ┃', reel[0][4], '┃┃', reel[1][4], '┃┃', reel[2][4], '┃ ┃', ' '],
    ['┃ ┗━━━┛', '┗━━━┛', '┗━━━┛ ┃', ' '],
    ['┃┌────┐ ┌────┐ ┌─┐┃'],
    ['┃│', pointsGot, '│ │', totalPoints, '│ │', pointsUsed, '│┃'], //9
    ['┃└────┘ └────┘ └─┘┃'],
    ['┗━━━━━━━━━━━━━━━━━┛']
  ];
  return slotMachine;
}

function matchAny2X(lot, multiplier) {
  let count2x = 0;
  for (let index = 0; index < 3; index++) {
    count2x = REEl_TEMPLATE[lot[index]] === PAY_TABLE[1][1] ? count2x + 1 : count2x;
  }

  switch (count2x) {
    case 1: return 2 * multiplier;
    case 2: return 5 * multiplier;
  }

  return 0;
}

function matchAny3OfSame(lot, multiplier) {
  for (let index = 5; index < PAY_TABLE.length - 2; index += 3) {
    const isWon = REEl_TEMPLATE[lot[0]].includes(PAY_TABLE[index][1].slice(1, PAY_TABLE.length))
      && REEl_TEMPLATE[lot[1]].includes(PAY_TABLE[index][3].slice(1, PAY_TABLE.length))
      && REEl_TEMPLATE[lot[2]].includes(PAY_TABLE[index][5].slice(1, PAY_TABLE.length));

    if (isWon) return PAY_TABLE[index][7] * multiplier;
  }

  return matchAny2X(lot, multiplier);
}

function calculatePoints(lot, multiplier) {
  for (let index = 1; index < PAY_TABLE.length - 2; index++) {
    const isWon = PAY_TABLE[index][1] === (REEl_TEMPLATE[lot[0]])
      && PAY_TABLE[index][3] === (REEl_TEMPLATE[lot[1]])
      && PAY_TABLE[index][5] === (REEl_TEMPLATE[lot[2]]);

    if (isWon) return PAY_TABLE[index][7] * multiplier;
  }
  return matchAny3OfSame(lot, multiplier);

}

function updatePoints(slotMachine, points, totalPoints) {
  slotMachine[9][1] = points.toString().padStart(4, '0');
  slotMachine[9][3] = totalPoints;
}

function findLot(limit, reel1Offset, reel2Offset, reel3Offset) {
  const lot = [];
  lot.push((limit - reel1Offset + 2) % 12);
  lot.push((limit - reel2Offset + 2) % 12);
  lot.push((limit - reel3Offset + 2) % 12);
  return lot;
}

function getMultiplier(message = '') {
  const response = parseInt(prompt(message + 'enter your bet(1x, 2x, 3x) :'), 10);
  return response > 0 && response <= 3 ? response : getMultiplier('invalid input🚫\n');
}

function generateOffset() {
  const reel1Offset = random(6) * 2 + 1 + 36;
  const reel2Offset = random(6) * 2 + 1 + 24;
  const reel3Offset = random(6) * 2 + 1 + 12;
  return [reel1Offset, reel2Offset, reel3Offset];
}

function spin(totalPoints, reel, slotMachine, pointsGot, pointsUsed) {

  totalPoints = parseInt(totalPoints) - pointsUsed;
  totalPoints = totalPoints.toString().padStart(4, 0);

  const reelOffset = generateOffset();

  const limit = 200;
  for (let index = 0; index < limit - reelOffset[2]; index++) {
    const count = index % 12;
    console.clear();
    let reelIndex = 0;

    for (let i = count + 5; i > count; i--) {
      reel[0][reelIndex] = index < limit - reelOffset[0] ? REEl_TEMPLATE[i] : reel[0][reelIndex];
      reel[1][reelIndex] = index < limit - reelOffset[1] ? REEl_TEMPLATE[i] : reel[1][reelIndex];
      reel[2][reelIndex] = index < limit - reelOffset[2] ? REEl_TEMPLATE[i] : reel[2][reelIndex];
      reelIndex++;
    }

    slotMachine = generateSlotMachine(totalPoints, pointsGot, pointsUsed, reel);
    console.clear();
    console.log(convertToString(slotMachine));
    delay(index * .008);
  }

  const lot = findLot(limit, reelOffset[0], reelOffset[1], reelOffset[2]);

  const points = calculatePoints(lot, pointsUsed);
  totalPoints = parseInt(totalPoints) + points;
  totalPoints = totalPoints.toString().padStart(4, 0);
  console.log(totalPoints);

  updatePoints(slotMachine, points, totalPoints);
  console.clear();
  console.log(convertToString(slotMachine));
  if (totalPoints <= 0) {
    console.log(color('you went bankrupt!', 9, 1))
  }

  if (confirm('do you want to bet again?')) {
    const multiplier = getMultiplier();
    spin(totalPoints, reel, slotMachine, pointsGot, multiplier);
  }
  return;
}

function main() {
  const reel = setReels();
  let totalPoints = '0010';
  const pointsGot = '0000';
  const pointsUsed = 1;
  let slotMachine = generateSlotMachine(totalPoints, pointsGot, pointsUsed, reel);

  console.log(convertToString(PAY_TABLE));
  console.log('\n◉ This is the pay table.\n◉ These are the points you get for the mentioned combinations.\n◉ The max you can bet is 3x.\n◉ The greater you bet the greater you get.');


  prompt('press any key to continue')
  console.clear();
  console.log(convertToString(slotMachine));


  if (confirm('do you want to bet:')) {
    const multiplier = getMultiplier();
    spin(totalPoints, reel, slotMachine, pointsGot, multiplier);
  }
}

main();
