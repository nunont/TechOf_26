
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');

fs.readdir(dirPath, (err, files) => {
    console.log(files);
    for (let i = 0; i < files.length; i++){
        const f = files[i];
        const filePath = path.join(dirPath, f);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isFile()){
            fs.readFile(filePath, 'utf-8', (erro, content) =>{
                console.log(content);
            })
        }
    }
})

