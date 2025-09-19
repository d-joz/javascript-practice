const number = 65;
const subString = 0; // put a 1 before the input
const subStringTxt = "00" //printable substring output
const subStringLength = 2;

let binaryReverse = 1;
let binary = 0;
let counter = 0;
let divider = number;

// binary convertion
while (divider > 0) { //convert binary in reverse
    binaryReverse = binaryReverse * 10;
    binaryReverse = binaryReverse + (divider % 2);
    divider = (divider - (divider % 2)) /2;
}
while (binaryReverse > 0) { // unreversing
    binary = ( binary * 10)  + (binaryReverse % 10);  
    binaryReverse = (binaryReverse - (binaryReverse % 10)) /10;
}
binary =  (binary - (binary % 10)) /10;

let tempSubString = subString

// substring counter
let tempBinary = binary;
let searchableBinary = 0;
let binaryBit = 0;
let subStringBit = 0;
let isAMember = false;
let ssCount = 0;

while (tempBinary > 1) {
    searchableBinary = tempBinary;
    tempSubString = subString;
    isAMember = false;
    
    for (let bitIndex = 0; bitIndex < subStringLength; bitIndex++) {
        binaryBit = searchableBinary % 10;
        subStringBit = tempSubString % 10;

        isAMember = binaryBit === subStringBit ? true : false ;
        if (!isAMember) {
            break; 
        }

        searchableBinary = (searchableBinary - (searchableBinary % 10)) / 10;
        tempSubString = (tempSubString - (tempSubString % 10)) / 10;

    }

    ssCount = ssCount + (isAMember ? 1 : 0);
    tempBinary = (tempBinary - (tempBinary % 10)) / 10;
}

// printong the output
console.log("Number :", number);
console.log("Substring :", subStringTxt);
console.log("Binary :",binary);
console.log("Answer :", ssCount);

