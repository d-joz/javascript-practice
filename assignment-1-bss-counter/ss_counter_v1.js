let binary = 1000001;
const subString = 10;
const subStringLength = 2;
let tempSubString = 0;
let tempBinary = binary;
let searchableBinary = 0;
let binaryBit = 0;
let subStringBit = 0;
let isAMember = false;
let ssCount = 0;

while (tempBinary > 1) {
    searchableBinary = tempBinary;
    tempSubString = subString;
    
    for (let bitIndex = 0; bitIndex < 2; bitIndex++) {
        binaryBit = searchableBinary % 10;
        subStringBit = tempSubString % 10;

        isAMember = binaryBit === subStringBit ? true : false ;

        searchableBinary = (searchableBinary - (searchableBinary % 10)) / 10;
        tempSubString = (tempSubString - (tempSubString % 10)) / 10;


        console.log("...",bitIndex, "...",binaryBit, "...",subStringBit);   
    }

    ssCount = ssCount + isAMember ? 1 : 0;
    tempBinary = (tempBinary - (tempBinary % 10)) / 10;

    console.log("---", isAMember);
}

console.log("/////", ssCount);
