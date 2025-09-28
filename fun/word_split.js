function isVowel(character) {
  const vowels = 'aeiou';
  for (let index = 0; index < vowels.length; index++) {
    if (character === vowels[index]) {
      return true;
    }
  }

  return false;
}

function splitOne(word, iWant) {
  let newWord = word[0];
  let rest = '';

  for (let index = 1; index < word.length; index++) {
    const isNewWordCharVowel = isVowel(newWord[newWord.length - 1]);
    const isCharVowel = isVowel(word[index]);

    if ((isNewWordCharVowel && !isCharVowel) || (!isNewWordCharVowel && isCharVowel)) {
      newWord = newWord + word[index];
    } else {
      rest = rest + word[index];
    }
  }

  return iWant === 'new word' ? newWord : rest;
}

function wordSplit(word) {
  let string = word;
  let result = '';

  while (string.length > 0) {
    result = result  + splitOne(string, 'new word');
    string = splitOne(string, 'remaining')
    result = string.length === 0 ? result : result + ',';
  }

  return result;
}

function test(word, expected) {
  const actual = wordSplit(word);

  const isPassed = actual === expected ? ' 🟢 ' : ' 🔴 ';
  const inputText = 'input : ' + word;
  const expectedText = '| expected : ' + expected;
  const actualText = '| => actual : ' + actual;

  console.log(isPassed, inputText, expectedText, actualText);
}

function testAll() {
  test('apple', 'ape,p,l');
  test('there', 'tere,h');
  test('hello', 'helo,l');
  test('abyss', 'ab,y,s,s');
  test('this', 'tis,h');
  test('banana', 'banana');
  test('himanshu', 'himanu,s,h');
  test('himanshuu', 'himanu,su,h');
  test('aaabbbaaa', 'aba,aba,aba');
  test('apocalypse', 'apocale,y,p,s')
}

testAll();
