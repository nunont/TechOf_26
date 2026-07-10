const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'txt', 'sopas.txt');

try {
    fs.unlinkSync(filePath);
}
catch (err){
    console.log(err)
}

fs.unlink(filePath, (error) => {
    if (!error){
        console.log("Apagado com sucesso")
    }
    else {
        console.error(`Error: ${error}`)
    }
})
