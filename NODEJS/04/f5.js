const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'txt', 'teams.txt');

var content = `
Cabo Verde
Inglaterra
Noruega
Colombia
United States of America
`

fs.appendFile(filePath, content, (error) => {
    if (!error){
        console.log('ficheiro atualizado com sucesso')
    }
    else {
        console.error(`Erro: ${error}`)
    }
})