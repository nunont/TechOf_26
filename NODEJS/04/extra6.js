const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'txt', 'teams.txt');

let readContent = fs.readFileSync(filePath, 'utf-8');

if (readContent.includes("Espanha")){
    readContent = readContent.replaceAll('Espanha', '');
}

if (readContent.includes('\n')){
    readContent = readContent.replaceAll('\n', '');
}

const newContent = `
Cabo Verde
Inglaterra
Noruega
Colombia
United States of America
`;

const totalContent = readContent + newContent;

fs.writeFileSync(filePath, totalContent);