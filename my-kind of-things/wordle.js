// not completed yet
const GREY = "240";
const GREEN = "034";
const YELLOW = "220";
const WHITE = "251";

const DISPLAY_LENGTH = 156;

function color(text, code = WHITE, bold = "") {
  return "\x1B[" + bold + ";38;5;" + code + "m" + text + "\x1B[0m";
}

function displayWord(word, length) {
  const formatted = [];

  for (let index = 0; index < 3; index++) {
    formatted.push(padCentre(extractLine(word, index), length));
  }

  return formatted.join("\n");
}

function extractLine(word, lineNo) {
  let line = "";
  for (let index = 0; index < word.length; index++) {
    line += word[index][lineNo];
  }

  return line;
}

function generateLetter(text, style) {
  const topLeftCorner = color("┏", style);
  const topRightCorner = color("┓", style);
  const bottomLeftCorner = color("┗", style);
  const bottomRightCorner = color("┛", style);
  const vertical = color("┃", style);
  const horizontal = color("━", style);

  const letter = color(text, style, 1);
  const letterTemplate = [
    [topLeftCorner + horizontal.repeat(3) + topRightCorner],
    [vertical + ` ${letter} ` + vertical],
    [bottomLeftCorner + horizontal.repeat(3) + bottomRightCorner],
  ];

  return letterTemplate;
}

function formatWord(word) {
  const arr = [];

  for (let index = 0; index < word.length; index++) {
    arr.push(generateLetter(word[index][0], word[index][1]));
  }

  return arr;
}

function displayBoard(board) {
  const arr = [];
  
  for (let index = 0; index < board.length; index++) {
    arr.push(displayWord(formatWord(board[index]), board[index].length));
  }
  console.log(arr.join("\n"));
}

function padCentre(string, length) {
  const leadingSpaces = Math.floor((DISPLAY_LENGTH - length * 5) / 2);
  const padLength = leadingSpaces + string.length;

  return string.padStart(padLength);
}

function colorMap(word) {
  const mapped = [];

  for (let index = 0; index < word.length; index++) {
    const element = [word[index], WHITE];
    mapped.push(element);
  }

  return mapped;
}

function createGuessArea(wordLength, chances) {
  const guessArea = [];

  for (let index = 0; index < chances; index++) {
    guessArea.push(colorMap(" ".repeat(wordLength)));
  }
  return guessArea;
}

function findMatches(guess, secretWord, board, chances) {
  const guessArea = board;
  for (let index = 0; index < guess.length; index++) {
    ((guessArea[chances][index] =
      guess[index] === secretWord[index]
        ? [guess[index], GREEN]
        : guess[index]),
    GREY),
      GREY;
  }
  return guessArea;
}

function updateKeyboard(guess, secretWord, keyboard) {
  return keyboard
}

function main() {
  const secretWord = "ADHI";
  let chances = 5;
  let guessArea = createGuessArea(secretWord.length, chances);

  let keyboard = [
    [
      ["Q", WHITE],
      ["W", WHITE],
      ["E", WHITE],
      ["R", WHITE],
      ["T", WHITE],
      ["Y", WHITE],
      ["U", WHITE],
      ["I", WHITE],
      ["O", WHITE],
      ["P", WHITE],
    ],
    [
      ["A", WHITE],
      ["S", WHITE],
      ["D", WHITE],
      ["F", WHITE],
      ["G", WHITE],
      ["H", WHITE],
      ["J", WHITE],
      ["K", WHITE],
      ["L", WHITE],
    ],
    [
      ["Z", WHITE],
      ["X", WHITE],
      ["C", WHITE],
      ["V", WHITE],
      ["B", WHITE],
      ["N", WHITE],
      ["M", WHITE],
    ],
  ];
  console.clear();
  displayBoard(guessArea);
  console.log("\n");
  displayBoard(keyboard);

  for (let index = 0; index < chances; index++) {
    const guess = prompt("enter your guess :");

    guessArea = findMatches(guess, secretWord, guessArea, index);
    keyboard = updateKeyboard(guess, secretWord, keyboard);

    console.clear();
    // console.log(guessArea, 'in loop')
    // console.log(keyboard, '................in loop')
    displayBoard(guessArea);
    console.log("\n");
    displayBoard(keyboard);
  }
}

main();
