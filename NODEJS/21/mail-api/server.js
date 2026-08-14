require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const CustomerRouter = require('./api/customers/customer.routes');
const PersonRouter = require('./api/persons/person.routes');
const AuthRouter = require('./api/users/auth.router');

const app = express();
app.use(express.json());
app.set('query parser', 'extended');

app.use('/api/customers', CustomerRouter);
app.use('/api/persons', PersonRouter);
app.use('/api/auth', AuthRouter)

mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);

app.listen(process.env.PORT, (error) => {
    if (error){
        console.log(error)
    }
    console.log("Api começou na porta", process.env.PORT);
})