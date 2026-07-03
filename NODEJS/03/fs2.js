
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'txt', '1.txt')
console.log(filePath);

const stats = fs.statSync(filePath);

if (stats.isFile()){
    var content = fs.readFileSync(filePath, 'utf-8');
    console.log(content)
}
console.log('Cheguei ao fim do codigo!');

