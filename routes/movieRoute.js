const movieRouter = require("express").Router();
const {
  createMovies,
  getAllMovies,
  getMovieById,
  getMovieByTitle,
} = require("../db");

movieRouter.get("/", async (req, res) => {
  try {
    const allMovies = await getAllMovies();
    res.send({ allMovies });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

movieRouter.post("/", async (req, res, next) => {
  const { title, genre, price, rated } = req.body;
  const movieData = {};

  try {
    movieData.title = title;
    movieData.genre = genre;
    movieData.price = price;
    movieData.rated = rated;

    const createMovie = await createMovies(movieData);

    if (isAdmin && createMovie) {
      res.send({ createMovie });
    } else {
      next({
        name: "MovieCreationError",
        message: "There was an error creating the movie. Please try again",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = movieRouter;
