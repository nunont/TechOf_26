const express = require('express');
const mongoose = require('mongoose');

const CustomerRouter = require('./api/customers/customer.routes');
const PersonRouter = require('./api/persons/person.routes');

const app = express();
app.use(express.json());

app.use('/api/customers', CustomerRouter);
app.use('/api/persons', PersonRouter);

const connectionString = 
"mongodb+srv://nunomarques:KrJpJUtsrCVqrJ3S@techof.dol23.mongodb.net/padel?appName=TechOf";

mongoose.connect(connectionString);

app.listen(3000, (error) => {
    if (error){
        console.log(error)
    }
    console.log("Api começou na porta", 3000);
})