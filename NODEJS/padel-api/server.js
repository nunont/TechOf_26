const express = require('express');
const mongoose = require('mongoose');

const AuthRouter = require('./api/users/auth.router');
const CustomerRouter = require('./api/customers/customer.routes');
const ClubRouter = require('./api/clubs/club.routes');
const FieldRouter = require('./api/fields/field.routes');
const BookingRouter = require('./api/bookings/booking.routes');

const app = express();
app.use(express.json());
app.set('query parser', 'extended');

app.use('/api/auth', AuthRouter);
app.use('/api/customers', CustomerRouter);
app.use('/api/clubs', ClubRouter);
app.use('/api/fields', FieldRouter);
app.use('/api/bookings', BookingRouter);

// Nota: usa uma base de dados diferente da security-api ("padel-api" em vez de
// "padel") para não colidir com as collections (user, customer) já existentes lá.
const connectionString =
    "mongodb+srv://nunomarques:KrJpJUtsrCVqrJ3S@techof.dol23.mongodb.net/padel-api?appName=TechOf";

mongoose.connect(connectionString);

const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Api começou na porta", PORT);
})
