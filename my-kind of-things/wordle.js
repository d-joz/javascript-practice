const GREY = "240";
const GREEN = "034";
const YELLOW = "221";
const WHITE = "251";
const RED = "196";

const DISPLAY_LENGTH = 126;

const WORDLE_WORDS = [
  "time", "year", "way", "man", "hand", "door", "part", "work", "game", "life",
  "keep", "look", "give", "take", "tell", "come", "made", "show", "feel", "call",
  "hope", "jump", "ride", "play", "sing", "good", "same", "sure", "high", "last",
  "hard", "cold", "only", "next", "deep", "fine", "main", "real", "true", "slow",
  "fast", "busy", "easy", "full", "wide", "long", "safe", "able", "open", "new",
  "house", "water", "table", "chair", "party", "night", "money", "place", "world", "heart",
  "story", "power", "field", "front", "point", "trade", "child", "force", "press", "value",
  "start", "think", "write", "found", "learn", "bring", "speak", "study", "build", "spend",
  "watch", "touch", "carry", "agree", "check", "cover", "exist", "share", "claim", "break",
  "great", "other", "small", "close", "first", "clear", "right", "wrong", "happy", "ready"
];

const KEYBOARD = [
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

const randomInRange = function (lower, upper) {
  return lower + Math.round(Math.random(upper - lower) * upper)
}
const color = function (text, code = WHITE, bold = "") {
  return "\x1B[" + bold + ";38;5;" + code + "m" + text + "\x1B[0m";
}
const displayWord = function (word, length) {
  const formatted = [];

  for (let index = 0; index < 3; index++) {
    formatted.push(padCentre(extractLine(word, index), length));
  }

  return formatted.join("\n");
}

const extractLine = function (word, lineNo) {
  let line = "";
  for (let index = 0; index < word.length; index++) {
    line += word[index][lineNo];
  }

  return line;
}

const generateLetter = function (text, style) {
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

const formatWord = function (word) {
  const arr = [];

  for (let index = 0; index < word.length; index++) {
    arr.push(generateLetter(word[index][0], word[index][1]));
  }

  return arr;
}

const displayBoard = function (board) {
  const arr = [];

  for (let index = 0; index < board.length; index++) {
    arr.push(displayWord(formatWord(board[index]), board[index].length));
  }
  console.log(arr.join("\n"));
}

const padCentre = function (string, length) {
  const leadingSpaces = Math.floor((DISPLAY_LENGTH - length * 5) / 2);
  const padLength = leadingSpaces + string.length;

  return string.padStart(padLength);
}

const colorMap = function (word) {
  const mapped = [];

  for (let index = 0; index < word.length; index++) {
    const element = [word[index], WHITE];
    mapped.push(element);
  }

  return mapped;
}

const createGuessArea = function (wordLength, chances) {
  const guessArea = [];

  for (let index = 0; index < chances; index++) {
    guessArea.push(colorMap(" ".repeat(wordLength)));
  }
  return guessArea;
}

const remove = function (char, string) {
  const index = string.indexOf(char);
  return string.slice(0, index) + string.slice(index + 1);
}

const findIncludes = function (guess, secretWord, board, chances) {
  let secret = secretWord.join('');
  console.log(secret, guess);

  const guessArea = board;
  for (let index = 0; index < guess.length; index++) {

    if (secret.includes(guess[index])) {
      secret = remove(guess[index], secret)
      guessArea[chances][index] = [guess[index], YELLOW];
    }
  }

  return guessArea;
}

const findMatches = function (guess, secretWord, board, chances) {
  const secret = secretWord.split('')
  const guessArea = board;

  for (let index = 0; index < guess.length; index++) {
    if (guess[index] === secretWord[index]) {
      secret[index] = '';
      guessArea[chances][index] = [guess[index], GREEN];
    } else {
      guessArea[chances][index] = [guess[index], GREY];
    }
    // guessArea[chances][index] =
    //   guess[index] === secretWord[index]
    //     ? [guess[index], GREEN]
    //     : [guess[index], WHITE];
  }

  return findIncludes(guess, secret, guessArea, chances);
}

const updateKeyboard = function (guess, secretWord, board) {
  let keyboard = board;
  for (let index = 0; index < guess.length; index++) {
    if (!secretWord.includes(guess[index])) {
      keyboard = dimLetter(guess[index]);
    }
  }

  return keyboard;
}

const dimLetter = function (char) {
  const referenceKeyboard = 'QWERTYUIOPASDFGHJKL ZXCVBNM   ';
  const index = referenceKeyboard.indexOf(char);

  const innerIndex = index % 10;
  const outerIndex = (index - innerIndex) / 10;

  console.log(KEYBOARD, outerIndex, innerIndex, index, char);
  KEYBOARD[outerIndex][innerIndex][1] = GREY;

}

const isAllAlphabets = function (string) {
  const Alphabets = 'QWERTYUIOPASDFGHJKLZXCVBNM';

  for (let index = 0; index < string.length; index++) {
    if (!Alphabets.includes(string[index])) {
      return false;
    }
  }
  return true;
}

function getGuess(secretWord, message = '') {
  console.log(message);
  const response = prompt('enter your guess : ').toUpperCase();
  if (response.length !== secretWord.length) {
    return getGuess(secretWord, `🚫length should be ${secretWord.length}`);
  }
  if (!isAllAlphabets(response)) {
    return getGuess(secretWord, '🚫enter only alphabets');
  }

  return response;
}

function main(args) {
  const chosenWord = args[0] || WORDLE_WORDS[randomInRange(0, 99)];
  // const secretWord = 'PARTY';
  const secretWord = chosenWord.toUpperCase();
  let chances = parseInt(args[1]) || 5;
  let guessArea = createGuessArea(secretWord.length, chances);

  console.clear();
  displayBoard(guessArea);
  console.log("\n");
  displayBoard(KEYBOARD);

  for (let index = 0; index < chances; index++) {
    const guess = getGuess(secretWord);

    guessArea = findMatches(guess, secretWord, guessArea, index);
    updateKeyboard(guess, secretWord);

    console.clear();
    // console.log(guessArea, 'in loop')
    // console.log(keyboard, '................in loop')
    displayBoard(guessArea);
    console.log("\n");
    displayBoard(KEYBOARD);

    if (guess === secretWord) {
      console.log(color('YOU WIN !!!', GREEN, 1))
      return;
    }
  }

  const message = `YOU LOSE !!!... THE WORD WAS ${secretWord}`;

  console.log(color(message, RED, 1));

}

main(Deno.args);
