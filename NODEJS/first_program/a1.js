
const mymodule = require('./mymodule');

console.log("Hello World!");

const sum = mymodule.plus(2,3);
console.log(`Sum = ${sum}`);

const minus = mymodule.minus(2,3);
console.log(`Minus = ${minus}`);

const namemodule = require('./namemodule');

const sayHello = namemodule.hello('Nuno', 'Marques');
console.log(sayHello);

namemodule.message('Bruna', 'Tenho bue gatos!', 'Lucas');

