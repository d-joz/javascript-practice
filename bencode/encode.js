function encode(element) {
  const type = typeof element;

  switch (type) {
    case 'number': return encodeNumber(element);
    case 'string': return encodeString(element);
    case 'object': return encodeArray(element);
  }
}

function encodeNumber(number) {
  return `i${number}e`
}
function encodeString(string) {
  return `${string.length}:${string}`
}
function encodeArray(array) {
  let result = '';
  for (let index = 0; index < array.length; index++) {
    result += encode(array[index]);
  }

  return `l${result}e`;
}

function test(type, input, expected) {
  const actual = encode(input);

  const isPass = actual === expected;
  const status = isPass ? '🟢' : '🔴';

  console.log(' ' + status, type);
  if (!isPass) {
    console.log(` --> input: ${input}`);
    console.log(` --> expected: ${expected}`);
    console.log(` --> actual: %c${actual}`, 'color: red');
  }
}

function testEncodeNumber() {
  console.log('\n....number....');
  test('number', 123, 'i123e');
  test('negative number', -42, 'i-42e');
  test('zero', 0, 'i0e');
}
function testEncodeString() {
  console.log('\n...string....');
  test('string', 'hello', '5:hello');
  test('empty string', '', '0:');
  test('string with space', 'hello world', '11:hello world');
  test('string with special chars', 'special!@#$chars', '16:special!@#$chars');
}
function testEncodeArray() {
  console.log('\n....array....');
  test('number array', [1, 2, 3], 'li1ei2ei3ee');
  test('empty array', [], 'le');
  test('nested array', [0, "", ["test"]], 'li0e0:l4:testee');
  test('nested array', ["", 0, []], 'l0:i0elee');
  test('nested inside nested', ["", 0, []], 'l0:i0elee');
}

function testAll() {
  console.log('\n........Encode.......');

  testEncodeNumber();
  testEncodeString();
  testEncodeArray();
}
function main() {
  testAll();
}

main(); 