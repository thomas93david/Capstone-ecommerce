const movieRouter = require("express").Router();
const {
  createMovies,
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  moviesPaginated
} = require("../db");

movieRouter.get("/", async (req, res, next) => {
  console.log("am i getting here?")
  try {
    const { pageSize = 10, pageNumber } = req.query

    let movies
    if (pageSize && pageNumber) {
      movies = await moviesPaginated(pageNumber, pageSize);
    } else {
      movies = await getAllMovies();
    }

    res.send({ allMovies: movies });
  } catch (err) {
    console.log("err", err)
    next(err);
  }
});
movieRouter.get('/:movieId', async (req, res, next) => {
  try {
    const id = req.params.movieId
    const movie = await getMovieById(id)
    if (!movie) {
      next({ name: "Id error", message: "no movie found by this id try again" })
    }
    else {
      res.send({
        movie
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
