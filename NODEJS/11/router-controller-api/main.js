const express = require('express');
const app = express();

app.use(express.json());

const toyRouter = require('./api/toys/toys.router');
app.use('/toys', toyRouter);

app.listen(3000, (error) => {
    if (error)
        console.error(error);

    console.log("API started on port 3000")
});
