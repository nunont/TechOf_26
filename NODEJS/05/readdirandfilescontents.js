
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');

const files = fs.readdirSync(dirPath);
console.log(files);

var allContent = '';
for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const fPath = path.join(dirPath, file);
    const fStat = fs.statSync(fPath);
    if (fStat.isFile()){
        var content = fs.readFileSync(fPath, 'utf-8');
        allContent += content;
    }
    
}

console.log(allContent);