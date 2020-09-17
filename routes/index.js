const express = require('express');
const apiRouter = express.Router()
const customersRouter = require('./customer');
// const moviesRouter = require('../db/movies');
// const cartRouter = require('../db/cart');
// // authorization
// set `req.user` if possible
const jwt = require('jsonwebtoken');
const { getCustomerById } = require('../db');
const { JWT_SECRET } = process.env;

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { // nothing to see here
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.customer = await getCustomerById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});
apiRouter.use((req, res, next) => {
    if (req.customer) {
        console.log("User is set:", req.customer);
    }

    next();
});

apiRouter.use('/customers', customersRouter);
// apiRouter.use('/movies', moviesRouter);
// apiRouter.use('/cart', cartRouter);
apiRouter.use((error, req, res, next) => {
    res.status(500).send(error);
})
module.exports = apiRouter;
