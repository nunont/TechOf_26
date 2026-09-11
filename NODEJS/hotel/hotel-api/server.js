const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRouter = require('./api/users/auth.router');
const GuestRouter = require('./api/guests/guest.routes');
const HotelRouter = require('./api/hotels/hotel.routes');
const RoomRouter = require('./api/rooms/room.routes');
const ReservationRouter = require('./api/reservations/reservation.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.set('query parser', 'extended');

app.use('/api/auth', AuthRouter);
app.use('/api/guests', GuestRouter);
app.use('/api/hotels', HotelRouter);
app.use('/api/rooms', RoomRouter);
app.use('/api/reservations', ReservationRouter);

// Nota: usa uma base de dados diferente das outras APIs ("hotel-api" em vez de
// "hotel") para não colidir com as collections (user, ...) já existentes lá.
const connectionString =
    "mongodb+srv://nunomarques:KrJpJUtsrCVqrJ3S@techof.dol23.mongodb.net/hotel-api?appName=TechOf";

mongoose.connect(connectionString);

const PORT = process.env.PORT || 3002;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Api começou na porta", PORT);
})
