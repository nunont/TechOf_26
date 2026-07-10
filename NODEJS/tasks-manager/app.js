const fs = require('fs');
const path = require('path');

const CATEGORIES = ['finance', 'personal', 'work'];

const command = process.argv[2];
console.log(`COMANDO EXECUTADO: ${command}`);

switch (command){
    case 'create':
        createTask(process.argv[3], 
            process.argv[4], process.argv[5])
        break;
    default:
        console.error("Comando nao suportado!")
}

//createTaks('sopas', 'cenoura', 'sopinha')
function createTask(category, name, description){
    if (!CATEGORIES.includes(category)){
        console.log('Category does not exist!');
        return;
    }
    console.log(`Tarefa Criada: ${category}/${name}`);
    
    try {
        const filePath = path.join(__dirname, 'tasks', category, `${name}.txt`);
        fs.writeFileSync(filePath, description);
        console.log('Tarefa criada com Sucesso')
    } catch (error) {
        console.error(erro);
    }
}
