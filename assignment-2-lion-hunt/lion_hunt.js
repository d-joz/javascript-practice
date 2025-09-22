const testCase1 = "LZ";
const testCase2 = "Z L";
const testCase3 = "Z LZ";
const testCase4 = "L     Z";
const testCase5 = "L     L";            // Setting up the savannah....
const testCase6 = "Z   Z   Z";
const testCase7 = "L  ZL Z";
const testCase8 = "L  Z   L Z";
const testCase9 = "L  Z LZ  L Z";
const testCase10 = "ZZZZZZ   LLL";

// Hunt starts here!!!...
const savannah = testCase10;

let lion = NaN;
let zebra = NaN;

let shortestDistance = Infinity;

for (let index = 0; index < savannah.length; index++) {
    lion = savannah[index] === "L" ? index : lion;
    zebra = savannah[index] === "Z" ? index : zebra;

    if (lion && zebra) {
        let distance = lion > zebra ? lion - zebra : zebra - lion;
        shortestDistance = shortestDistance < distance ? shortestDistance : distance;
    }
}

shortestDistance = shortestDistance !== Infinity ? shortestDistance - 1 : -1;   //offsetting the shortest distance 

console.log("Savannah:-----------------", savannah, "\nDistance to nearest Zebra:", shortestDistance);
