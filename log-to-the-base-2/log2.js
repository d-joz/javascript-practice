const number = 32;
let log = 0;

let numberHalved = number;

while (numberHalved > 1) {
    numberHalved = (numberHalved - numberHalved % 2) / 2;
    log++;
}

log = number > 0 ? log : undefined

console.log("log to the base 2 of", number, "is", log);
