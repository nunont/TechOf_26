
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'txt', 'scores2.txt')

const content = `
Mundial 2026
Portugal vs Espanha
0 - 1

Argentina vs Egito
2 - 2
`;

fs.writeFileSync(filePath, content.trim());