const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'new', 'sopas.txt');
const newFilePath = path.join(__dirname, 'files', 'txt', 'sopas.txt');

fs.renameSync(filePath, newFilePath);