const express = require('express');
const { connectDb } = require('./db/db');

const app = express();
app.use(express.json());

// ROUTERS
const movieRouter = require('./api/movies/movie.router');
app.use('/api/movies', movieRouter);

connectDb()
    .then(() => {
        app.listen(3000, (error) => {
            if (error){
                console.log(error)
            }
            console.log("Api começou na porta", 3000);
        })
    });