const express = require("express");
const adminRouter = express.Router();
const { getAllCustomers, getCustomerById, deleteCustomer, getMovieById, deleteMovie, createMovies } = require("../db");
const { requireAdmin } = require("./utils");



adminRouter.get("/customers", async (req, res, next) => {
    console.log("is this working")
    try {
        const customers = await getAllCustomers()
        console.log("this is the customers list.. ", customers)
        res.send({ customers })

    } catch (err) {
        console.error(err)

    }

})

adminRouter.delete("/customers/:customerId/:cartId", async (req, res, next) => {
    try {
        const cId = req.params.customerId
        const cartId = req.params.cartId
        console.log("this is the C Id inside of admin route... ", cId)
        const customerId = await getCustomerById(cId)
        console.log("is this the customer i want to update", customerId)
        const deletedCustomer = await deleteCustomer(customerId.id, cartId)
        console.log("this is the deletedCustomer...", deletedCustomer)
        res.send({ deletedCustomer })
    } catch ({ name, message }) {
        next({ name, message })
    }
})
adminRouter.delete("/movies/:movieId", async (req, res, next) => {

    try {
        const mId = req.params.movieId
        const movieId = await getMovieById(mId)
        const deletedMovie = await deleteMovie(movieId)
        res.send({ deletedMovie })
    } catch (err) {
        console.error(err)
    }
})
adminRouter.post("/movies", async (req, res, next) => {
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



module.exports = adminRouter
