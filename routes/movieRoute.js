const movieRouter = require("express").Router();
const {
  createMovies,
  getAllMovies,
  getMovieById,
  getMovieByTitle,
} = require("../db");

movieRouter.get("/", async (req, res, next) => {
  try {
    const allMovies = await getAllMovies();
    res.send({ allMovies });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
movieRouter.get('/:movieId', async (req, res, next) => {
  try {
    const id = req.params.movieId
    const getMovieId = await getMovieById(id)
    if (!getMovieId) {
      next({ name: "Id error", message: "no movie found by this id try again" })
    }
    else {
      res.send({
        getMovieId
      })
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
})
movieRouter.post("/", async (req, res, next) => {
  const { title, genre, price, rated } = req.body;
  const movieData = {};

  try {
    movieData.title = title;
    movieData.genre = genre;
    movieData.price = price;
    movieData.rated = rated;

    const createMovie = await createMovies(movieData);

    if (createMovie) {
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
