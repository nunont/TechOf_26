const express = require('express');

const movieRouter = express.Router();
const movieController = require('./movies.controller')

movieRouter.get("/", movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.post("/", movieController.createMovie);
movieRouter.put("/:id", movieController.updateMovie);
movieRouter.delete("/:id", movieController.deleteMovie);

module.exports = movieRouter;