const input = 6;
let factorial = input;

for (let multiplier = input - 1; multiplier > 1; multiplier--) {
    factorial = factorial * multiplier;
}

console.log( "factorial of", input,"is", factorial);
