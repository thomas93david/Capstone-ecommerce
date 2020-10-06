const express = require("express");
const CheckoutSuccessRouter = express.Router();
const { getCustomer } = require('../db');


CheckoutSuccessRouter.get('/', async (req, res, next) => {
    try {
        const genres = await getCustomer();
        res.send(genres);
    } catch (error) {
        next(error);
    }
});

module.exports = CheckoutSuccessRouter;
