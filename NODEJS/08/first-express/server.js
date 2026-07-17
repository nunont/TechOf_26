const fs = require('fs').promises;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('First Express API!');
});

app.post('/', (req, res) => {
    res.status(200).send('First Post Request on API');
});

app.get('/api', (req, res) => {
    res.status(200).json({
        api: "first-express",
        version: 1.0,
        author: 'Nuno Marques'
    })
});

app.get('/api/v2', (req, res) => {
    res.status(200).json({
        api: "first-express",
        version: 2.0,
        author: 'Nuno Marques'
    })
})

app.get('/api/name', (req, res) => {
    res.status(200).json({
        name: "Nuno Miguel Guerreiro Marques"
    });
})

function getRandomNumberInterval(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

app.get('/students/number', (req, res) => {
    res.status(200).send(getRandomNumberInterval(0, 100));
});

app.post('/courses/n1ton2', (req, res) => {
    res.status(200).send(getRandomNumberInterval(1000, 2000));
})

app.get('/api/users/:id', (req, res) => {
    console.log(req.params)
    res.status(200).json({
        id: req.params.id
    });
});
//http://localhost:3000/api/users/223/name
//http://localhost:3000/api/users/1/sopas
app.get('/api/users/:id/:field', (req, res) => {
    console.log(req.params)
    res.status(200).json({
        id: req.params.id,
        field: req.params.field
    });
})

app.use('/assets', express.static(__dirname + '/public'))

app.get('/first-page', (req, res) => {
    fs.readFile('first-page.html', 'utf-8')
    .then((content) => {
        res.status(200).send(content);
    })
    .catch((error) => {
        res.status(500)
        .send('Erro ao ler ficheiro')
    })
})

app.listen(3000, (error) => {
    if (error){
        console.log(error)
    }
    console.log("API has started...")
});
