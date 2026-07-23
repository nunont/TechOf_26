const express = require('express');
const toysService = require('./toys-service');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    
})

app.get('/toys', toysService.getAllToys);

app.post('/toys', toysService.createToy)

app.get('/toys/:id', toysService.getToyById)

app.put('/toys/:id', toysService.updateToy)

app.delete('/toys/:id', toysService.deleteToy)

app.listen(3000, (error) => {
    if (error)
        console.error(error);

    console.log("API started on port 3000")
});