const express = require('express');
const toysService = require('./toys-service');

const app = express();

const toyRouter = express.Router();
app.use('/toys', toyRouter);
app.use(express.json());


toyRouter.get('/', toysService.getAllToys);
toyRouter.post('/', toysService.createToy);
toyRouter.get('/:id', toysService.getToyById)
toyRouter.put('/:id', toysService.updateToy)
toyRouter.delete('/:id', toysService.deleteToy)

app.listen(3000, (error) => {
    if (error)
        console.error(error);

    console.log("API started on port 3000")
});