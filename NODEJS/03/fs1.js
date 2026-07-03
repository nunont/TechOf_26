
const fs = require('fs');

try {
    const data = fs.readFileSync('b.txt', 'utf-8');
    console.log(data);
} catch (error) {
    console.log('Deu ERRO AO LER O FICHEIRO');
    if (error.code == "ENOENT"){
        console.error("Ficheirno nao encontrado")
    }
    else {
        console.log(error)
    }
}