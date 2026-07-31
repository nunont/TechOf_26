const { ObjectId } = require('mongodb');
const { getDb } = require('./../../db/db');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await getDb().collection('movies').find().toArray();
        res.status(200).json(movies);
    } catch (error){
        res.status(500).json({
            status: "Internal Server Error",
            error: error
        })
    }
}

exports.getMovieById = (req, res) => {
    getDb().collection('movies')
        .findOne({ _id: new ObjectId(req.params.id)})
        .then((movie) => {
            if (!movie){
                return res.status(404).json({
                    status: "NotFound",
                    error: "O filme nao existe"
                })
            }

            res.status(200).json(movie);
        })
        .catch((error) => {
            res.status(500).json({
                status: "Internal Server Error",
                error: error
            });
        })
}

exports.createMovie = async (req, res) => {
    try {
        const body = req.body;
        const insertedMovie = await getDb().collection('movies')
            .insertOne(body);
        console.log(insertedMovie);

        if (!insertedMovie.insertedId){
            return res.status(400).json({
                status: 'Payload Error',
                error: "Erro no body"
            })
        }

        var newMovie = 
            await getDb()
            .collection('movies')
            .findOne({ _id: insertedMovie.insertedId})

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({
            status: "Internal Server Error",
            error: error
        })
    }
}

exports.updateMovie = (req, res) => {
    res.send("UPDATE MOVIE");
}

exports.deleteMovie = (req, res) => {
    res.send("DELETE MOVIE");
}