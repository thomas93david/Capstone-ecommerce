
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customersRouter = express.Router();
const { createCustomer, getCustomerByUsername } = require("../db");

customersRouter.post("register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let securedPassword;
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
        else bcrypt.hash(password, SALT_COUNT, async (err, hashedPassword) => {
            securedPassword = hashedPassword
            const customer = await createCustomer({ username, password: securedPassword })
            const token = jwt.sign({ id: customer.id, username }, process.env.JWT_SECRET, {
                expiresin: "5w",
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
module.exports = customersRouter;