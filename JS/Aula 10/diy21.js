console.log("DO IT YOURSELF 21");

let numbers = [400, 60, 35]
console.log(numbers)

alert(numbers.sort().reverse());

let realDescending = numbers.sort((a, b) => b - a);
console.log("Real Descending", realDescending);
