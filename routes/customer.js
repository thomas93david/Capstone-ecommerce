
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customersRouter = express.Router();
const { createCustomer, getCustomerByUsername, getCustomer } = require("../db");

customersRouter.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let passwordHash;
        const SALT_COUNT = 11
        const _customer = await getCustomerByUsername({ username })

        if (_customer) {
            next({
                name: "customerExistsError",
                message: "A customer by that name already exists."
            })
        }
        if (password.length <= 7) {
            next({
                name: "PasswordLengthError",
                message: "The password must be a minimum of at least 8 characters."
            })
        }
        else bcrypt.hash(password, SALT_COUNT, async (err, hashed) => {
            passwordHash = hashed
            const customer = await createCustomer({ username, password: passwordHash })
            console.log("getting the customer in the route", customer.id)
            const token = jwt.sign({ id: customer.id, username }, process.env.JWT_SECRET, {
                expiresIn: "5w",
            })
            delete customer.id
            delete customer.password
            customer.token = token
            res.send({ message: "customer was created", customer })
        })
    } catch ({ name, message }) {
        next({ name, message })
    }
})

customersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    // request must have both
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        });
    }
    try {
        const customer = await getCustomer({ username, password });
        if (!customer) {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            });
        } else {
            const token = jwt.sign(
                {
                    id: customer.id,
                    username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "5w",
                }
            );

            delete customer.password;
            customer.token = token;
            res.send({ message: "you're logged in!", customer });
        }
        // console.log('my user', user)
    } catch (error) {
        console.log(error);
        next(error);
    }
})






module.exports = customersRouter;