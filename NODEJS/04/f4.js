const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'txt', 'teams.txt');

const content = `
Equipas:
Portugal
Espanha
Belgica
Brasil
Egito
Argentina
`.trim();

fs.writeFile(filePath, content, function(error) {
    if (!error){
        console.log('Ficheiro Atualizado com sucesso')
    }
    else {
        console.error(`Erro: ${error}`)
    }
})
