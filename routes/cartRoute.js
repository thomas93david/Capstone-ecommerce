const express = require('express')
const cartRouter = express.Router()

const cors = require("cors");
const stripe = require("stripe")("STRIPsk_test_51HV1w8L7qGrgZ4TMBtb08cFEbCg24EXhsIVpXjI1HmMxeQSeEsaXePy35P6biuUxcNpn6ZCN5DzNNu2Az3IGjMwA00LeEfpmHwE_SECRET_KEY");
const uuid = require("uuid/v4");
const { requireCustomer } = require("./utils")
cartRouter.use(express.json());
cartRouter.use(cors());

cartRouter.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { product, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create(
            {
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {
                idempotency_key
            }
        );
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }
    res.json({ error, status });
})
const { addMovieToCart, removeMovieFromCart, updateQuantity, getMoviesByCart, createCart, getCartIdByCustomerId } = require('../db');

//I believe you used this to assign cart to customer??
cartRouter.post('/', requireCustomer, async (req, res, next) => {
    console.log("hello world")
    try {
        console.log("im getting here at cartroute...")
        // const customerId = req.params.customerId
        const cart = await createCart();
        if (!cart) {
            next({ name: "customer error", message: "no customer exist check cart route" })
        }
        else {
            res.send({ cart })
        }
    } catch ({ name, message }) {
        next({ name, message })

    }
})

//@david or @travis: how to we use this route to set the initial state upon login!!!?
//get movies in persons cart from either our DB or local storage (-: ->
cartRouter.get('/:customerId', async (req, res, next) => {
    try {
        const customerCartId = await getCartIdByCustomerId(req.params.customerId)
        const cartMovies = 
        await getMoviesByCart(customerCartId) || localStorage.getItem("cart");
        res.send(cartMovies);
    } catch (error) {
        next(error);
    }
});

//add movie to cart:
cartRouter.post('/:customerId', async (req, res, next)=>{
    try {
        const { movieId, quantity } = req.body;
        const cartId = await getCartIdByCustomerId(req.params.customerId);
        await addMovieToCart(movieId, cartId, quantity);
    } catch (error) {
        next(error);
    }
});

//remove movie from cart in DB ( local storage updates with redux state ):
cartRouter.delete('/:customerId', async (req, res, next) => {
    try {
        const customerCartId = await getCartIdByCustomerId(req.params.customerId)
        const { movieId, quantity } = req.body;
        if (quantity > 1) {
            let newQuantity = quantity - 1;
            await updateQuantity(newQuantity);
            res.send("Successfully removed movie");
        } else {
            await removeMovieFromCart(movieId, customerCartId);
            res.send("Successfully removed movie");
        }

    } catch (error) {
        next(error);
    }
});

module.exports = cartRouter