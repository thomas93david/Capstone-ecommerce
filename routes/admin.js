const express = require("express");
const adminRouter = express.Router();
const { getAllCustomers, getCustomerById, deleteCustomer, getMovieById, deleteMovie } = require("../db");
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

adminRouter.delete("/customer/:customerId", async (req, res, next) => {
    try {
        const cId = req.params.customerId
        console.log("this is the C Id inside of admin route... ", cId)
        // const customerId = await getCustomerById(cId.id)
        // console.log("is this the customer i want to update", customerId)
        const customerId = await getCustomerById(cId)
        const deletedCustomer = await deleteCustomer(customerId)
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

module.exports = adminRouter
