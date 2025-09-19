const subString = "00";

const binary = "1000";

// to find the count of substring
let subStringLength = subString.length;
let binaryLength = binary.length;
let subStringCount = 0;

let binaryIndex = 0;

while ((binaryIndex + subStringLength) <= binaryLength) {
    let subStringIndex = 0;
    let isBitsSame = true;

    while (subStringIndex < subStringLength && isBitsSame) {
        isBitsSame = binary[binaryIndex + subStringIndex] === subString[subStringIndex] ? true : false ;
        subStringIndex++;
    }

    subStringCount = subStringCount + (isBitsSame ? 1 : 0);
    binaryIndex++;
    console.log("substring count : ", subStringCount);
    
}

