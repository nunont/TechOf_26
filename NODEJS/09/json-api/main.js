const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

var toys = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

app.get('/toys', (req, res) => {
    res.status(200).json({
        status: "sucess",
        data: toys
    });
});

app.post('/toys', (req, res) => {
    let data = req.body;
    const nextId = toys[toys.length - 1].id + 1;
    data = {id: nextId, ...data};

    toys.push(data);
    fs.writeFileSync('data.json', JSON.stringify(toys));

    res.status(201).json({
        status: "created",
        data: data
    });
})

app.get('/toys/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    const toy = toys.find(f => f.id === id);

    if (toy == undefined){
        res.status(404).json({
            status: "Not Found"
        });
        return;
    }

    res.status(200).json({
        status: "sucess",
        data: toy
    });
})

app.put('/toys/:id', (req, res) => {
    const indexToy = toys.findIndex(f => f.id == Number.parseInt(req.params.id));
    if (indexToy == -1){
        res.status(404).json({
            status: 'Not Found'
        });
        return;
    }
    let toy = toys[indexToy];

    const data = req.body;
    toy = { id: toy.id, ...data };
    toys[indexToy] = toy;

    fs.writeFileSync('data.json', JSON.stringify(toys));

    res.status(200).json({
        status: 'sucess',
        data: toy
    })
})

app.delete('/toys/:id', (req, res) => {
    const toyIndex = toys.findIndex(f => f.id === Number.parseInt(req.params.id));
    if (toyIndex == -1){
        res.status(404).json({
            status: 'Not Found'
        });
        return;
    }

    toys.splice(toyIndex, 1);
    fs.writeFileSync('data.json', JSON.stringify(toys));

    res.status(200).json({
        status: 'deleted'
    });

})

app.listen(3000, (error) => {
    if (error)
        console.error(error);

    console.log("API started on port 3000")
});