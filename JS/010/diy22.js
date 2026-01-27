console.log("DO IT YOURSELF 21");

let numbers = [400, 600, 35]
console.log(numbers)

numbers.pop()

alert(numbers.sort().reverse());

let realDescending = numbers.sort((a, b) => b - a);
console.log("Real Descending", realDescending);
