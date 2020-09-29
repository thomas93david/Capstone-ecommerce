const express = require("express");
const genreRouter = express.Router();
const { getAllGenres } = require('../db');


genreRouter.get('/', async (req, res, next)=>{
    try {
        const genres = await getAllGenres();
        res.send(genres);
    } catch (error) {
        next(error);
    }
});

module.exports = genreRouter;