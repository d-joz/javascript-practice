function isArray(x) {
  return typeof x === 'object';
}
function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let index = 0; index < array1.length; index++) {
    if (!areDeepEqual(array1[index], array2[index])) {
      return false;
    }
  }

  return true;
}
function areDeepEqual(array1, array2) {
  if (typeof array1 !== typeof array2) {
    return false;
  }

  if (isArray(array1) && isArray(array2)) {
    return areArraysEqual(array1, array2);
  }

  return array1 === array2;
}

function decode(encodedText) {
  return deepDecode(encodedText)[0];
}

function deepDecode(encodedText) {
  if (encodedText.startsWith('i')) {
    return decodeNumber(encodedText);
  }
  if (!isNaN(parseInt(encodedText))) {
    return decodeString(encodedText);
  }
  if (encodedText.startsWith('l')) {
    return decodeArray(encodedText);
  }
}

function decodeNumber(encodedNumber) {
  const endOfNumber = encodedNumber.indexOf('e');
  return [parseFloat(encodedNumber.slice(1, endOfNumber)), endOfNumber + 1];
}

function decodeString(encodedString) {
  const delimiter = encodedString.indexOf(':')
  const length = parseInt(encodedString.slice(0, delimiter));

  const start = delimiter + 1;
  const end = start + length;

  return [encodedString.slice(start, end), end];
}

function decodeArray(encoded) {
  const decoded = [];
  let index = 1;

  while (encoded[index] !== 'e') {
    const response = deepDecode(encoded.slice(index, encoded.length));

    index += response[1];
    decoded.push(response[0]);

  }
  return [decoded, index];
}

function testDecode(type, expected, input) {
  const actual = decode(input);

  const isPass = areDeepEqual(actual, expected);
  const status = isPass ? '🟢' : '🔴';

  console.log(' ' + status, type);
  if (!isPass) {
    console.log(` --> input: ${input}`);
    console.log(` --> expected: `, expected);
    console.log(` --> actual: `, actual);
  }
}

function testDecodeNumber() {
  console.log('\n....number....');
  testDecode('number', 123, 'i123e');
  testDecode('negative number', -42, 'i-42e');
  testDecode('zero', 0, 'i0e');
}
function testDecodeString() {
  console.log('\n...string....');
  testDecode('string', 'hello', '5:hello');
  testDecode('empty string', '', '0:');
  testDecode('string with space', 'hello world', '11:hello world');
  testDecode('string with special chars', 'special!@#$chars', '16:special!@#$chars');
}
function testDecodeArray() {
  console.log('\n....array....');
  testDecode('number array', [1, 2, 3], 'li1ei2ei3ee');
  testDecode('empty array', [], 'le');
  testDecode('nested array', [0, "", ["test"]], 'li0e0:l4:testee');
  testDecode('nested array', ["", 0, []], 'l0:i0elee');
  testDecode('nested inside nested', ["", 0, []], 'l0:i0elee');
}

function testAll() {
  console.log('\n........Decode.......');

  testDecodeNumber();
  testDecodeString();
  testDecodeArray();
}

function main() {
  testAll();
}

main(); 