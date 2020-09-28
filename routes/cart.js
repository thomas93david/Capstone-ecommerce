const express = require('express')
const cartRouter = express.Router();
const { requireCustomer } = require("./utils")
const { addMovieToCart, removeMovieFromCart, updateQuantity, getMoviesByCart, createCart } = require('../db');
//add movies to cart:
// cartRouter.post('/', async (req, res, next) => {
//     try {
//         const { movieId, cartId, quantity } = req.body;
//         const cart = await addMovieToCart(movieId, cartId, quantity);
//         res.send( cart );

//     } catch (error) {
//         next(error);
//     }
// });

// cartRouter.post('/', async (req, res, next) => {
//     try {
//         // const customerId = req.params.customerId
//         const cart = await createCart();
//         if (!cart) {
//             next({ name: "customer error", message: "no customer exist check cart route" })
//         }
//         else {
//             res.send({ cart })
//         }
//     } catch ({ name, message }) {
//         next({ name, message })

//     }
// })





//get movies in persons cart:
//uncertain about the url thing trav help a sister out:
cartRouter.get('/:customerId/:cartId', requireCustomer, async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const cartMovies = await getMoviesByCart(req.params.cartId);
        res.send(cartMovies);
    } catch (error) {
        next(error);
    }
})

//remove movie from cart

cartRouter.delete('/:cartId', async (req, res, next) => {
    try {
        const { movieId, quantity } = req.body;
        if (quantity > 1) {
            let newQuantity = quantity - 1;
            await updateQuantity(newQuantity);
            res.send("Successfully removed movie");
        } else {
            await removeMovieFromCart(movieId, req.params.cartId);
            res.send("Successfully removed movie");
        }

    } catch (error) {
        next(error);
    }
})
module.exports = cartRouter;