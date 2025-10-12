function color(text, code, bold = '') {
  return "\x1B[" + bold + ";38;5;" + code + "m" + text + "\x1B[0m";
}
function delay(multiplier = 3) {
  for (let index = 0; index < multiplier * 100000000; index++) { }
}
const blue7 = color(':7:', 27, 1);
const greenBar = color('bar', 10);
const pink7 = color(':7:', 13, 1);
const twoX = color('~2x', 57, 1);
const red7 = color(':7:', 9, 1);
const yellowBar = color('bar', 11);

const reel = [blue7, '   ', greenBar, '   ', pink7, '   ', twoX, '   ', red7, '   ', yellowBar, '   ', blue7, '   ', greenBar, '   ', pink7, '   ', twoX, '   ', red7, '   ', yellowBar, '   '];

const offset= Math.round(Math.random()* 24);
for (let index = 0; index < 60 + offset; index++) {
  const count = index % 6
  console.clear();
  console.log('┏━━━┓');
  for (let index = count; index < count + 5; index++) {
    console.log('┃' + reel[index] + '┃');
  }
  console.log('┗━━━┛');
  delay(2 * (index * .03));
}

prompt()






// \t┏━━━━━━━━━┓
// \t┃         ┃
// \t┃    ◉    ┃
// \t┃         ┃
// \t┗━━━━━━━━━┛