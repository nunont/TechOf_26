const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files', 'html');

if (!fs.existsSync(dirPath)){
    fs.mkdir(dirPath, (error) => {
        if (!error){
            console.log('Pasta criada')
        }
        else {
            console.error(`Erro: ${error}`)
        }
    })
}
else {
    console.log("A pasta ja existe")
}

