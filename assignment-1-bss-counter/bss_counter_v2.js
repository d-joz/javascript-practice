const number = 31;
const subString = "11";

// to find binary of the number
let numberCopy = number;
let binary = "";

while (numberCopy > 0) {
    binary = (numberCopy % 2) + binary;
    numberCopy = (numberCopy - (numberCopy % 2)) / 2;
}

// to find the count of substring
let subStringLength = subString.length;
let binaryLength = binary.length;
let subStringCount = 0;

let binaryIndex = 0;

while ((binaryIndex + subStringLength) <= binaryLength) {
    let subStringIndex = 0;
    let isBitsSame = true;

    while (subStringIndex < subStringLength && isBitsSame) {
        let bitIndex = binaryIndex + subStringIndex;
        isBitsSame = binary[bitIndex] === subString[subStringIndex] ? true : false;
        subStringIndex++;
    }
    subStringCount = subStringCount + (isBitsSame ? 1 : 0);
    binaryIndex++;
}

console.log("Number:", number);
console.log("Substring:", subString);
console.log("Binary:", binary);
console.log("Answer:", subStringCount);

