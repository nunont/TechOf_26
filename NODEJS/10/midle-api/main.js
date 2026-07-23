const express = require('express');
const toysService = require('./toys-service');
const authMiddleware = require('./auth-middleware');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Endoint chamado às ${new Date().toString()}`);
    next();
})

app.use('/toys/:id', (req, res, next) => {
    console.log(`Metodo chamado ${req.method} com o id: ${req.params.id}`);
    next();
})


app.get('/toys', authMiddleware.verifyIsAdminArray, toysService.getAllToys);

app.post('/toys', authMiddleware.verifyIfCanWrite, toysService.createToy);

const getByIdMidleware = (req, res, next) => {
    console.log('O endpoint GET de Toys por ID foi chamado');
    next();
};

const getByIdSecondMidleware = (req, res, next) => {
    console.log('Segundo midleware foi chamado pq sim');
    next();
}

const arrayOfMiddlewaresOfGetById = [getByIdMidleware, getByIdSecondMidleware];

app.get('/toys/:id', arrayOfMiddlewaresOfGetById, toysService.getToyById)

app.put('/toys/:id', authMiddleware.verifyIfCanWrite, toysService.updateToy)

app.delete('/toys/:id', toysService.deleteToy)

app.listen(3000, (error) => {
    if (error)
        console.error(error);

    console.log("API started on port 3000")
});