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
    case 'delete':
        //dsfdsfds
        break;
    case 'complete':
        completeTask(process.argv[3], process.argv[4]);
    default:
        console.error("Comando nao suportado!")
        break;
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
        console.error(error);
    }
}

function completeTask(category, name){
    const basePath = path.join(__dirname, 'tasks', category);
    const fileName = `${name}.txt`;
    const filePath = path.join(basePath, fileName);

    const fStat = fs.statSync(filePath);

    if (!fStat.isFile()){
        console.error('O ficheiro não existe!')
        return
    }

    const newPath = path.join(basePath, `✅ ${fileName}`);
    fs.renameSync(filePath, newPath);

    const completeMetadata = `
==================================
            TAREFA COMPLETA
==================================
`;

    const fileContent = fs.readFileSync(newPath, 'utf-8');
    const newContent = completeMetadata + fileContent;

    fs.writeFileSync(newPath, newContent);
}
