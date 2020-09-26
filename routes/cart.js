const express = require('express')
const cartRouter = express.Router();

const { addMovieToCart, removeMovieFromCart, updateQuantity, getMoviesByCart } = require('../db');
//add movies to cart:
cartRouter.post('/', async (req, res, next) => {
    try {
        const { movieId, cartId, quantity } = req.body;
        await addMovieToCart(movieId, cartId, quantity);
        res.send("Added Movie To Cart!");

    } catch (error) {
        next(error);
    }
});

//get movies in persons cart:
//uncertain about the url thing trav help a sister out:
cartRouter.get('/:customerId/:cartId', async (req, res, next) => {
    try {
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