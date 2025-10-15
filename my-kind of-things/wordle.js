// not completed yet
const GREY = 240;
const GREEN = 34;
const YELLOW = 220;

function color(text, code, bold = '') {
  return "\x1B[" + bold + ";38;5;" + code + "m" + text + "\x1B[0m";
}

function displayWord(word) {
  const formatted = [];

  for (let index = 0; index < 3; index++) {
    formatted.push(extractLine(word, index));
  }

  return formatted.join('\n')
}

function extractLine(word, lineNo) {
  let line = ''
  for (let index = 0; index < word.length; index++) {
    line += word[index][lineNo]
  }

  return line
}

function generateLetter(text, style = GREY) {
  const topLeftCorner = color('┏', style);
  const topRightCorner = color('┓', style);
  const bottomLeftCorner = color('┗', style);
  const bottomRightCorner = color('┛', style);
  const vertical = color('┃', style);
  const horizontal = color('━', style);

  const letter = color(text, style, 1);
  const letterTemplate = [
    [topLeftCorner + horizontal.repeat(3) + topRightCorner],
    [vertical + ` ${letter} ` + vertical],
    [bottomLeftCorner + horizontal.repeat(3) + bottomRightCorner]
  ];
  return letterTemplate;
}

function main() {

  const word = 'ADHI';
  const arr = [];

  for (let index = 0; index < word.length; index++) {
    arr.push(generateLetter(word[index], GREEN));
  }

  console.log(displayWord(arr));

  

}

main();
