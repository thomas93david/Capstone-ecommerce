const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customersRouter = express.Router();
const { createCustomer, getCustomerByUsername, getCustomer, createCart, getCustomerById, makeAdmin } = require("../db");
const { requireCustomer } = require("./utils");


customersRouter.get("/:customerId", requireCustomer, async (req, res, next) => {
  try {
    const getCustomer = req.params.customerId
    console.log("fucking work", getCustomer)
    const customer = await getCustomerById(getCustomer.id)
    console.log("fucking work or im done...please", customer)
    res.send({ customer })
  } catch (error) {
    console.error(error);
  }
})

customersRouter.patch("/:customerId", async (req, res, next) => {
  try {
    const cId = req.params.customerId
    console.log("this is the C Id... ", cId)
    // const customerId = await getCustomerById(cId.id)
    // console.log("is this the customer i want to update", customerId)
    const createAdmin = makeAdmin(cId)
    if (cId) {
      res.send({ createAdmin })
    } else {
      next({ name: "no customer ID", message: "please create a customer first before making admin" })
    }

  } catch ({ name, message }) {
    next({ name, message })
  }
})


customersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let passwordHash;
    const SALT_COUNT = 11;
    const _customer = await getCustomerByUsername(username);
    console.log("brett said to console log the username", username);
    if (_customer) {
      next({
        name: "customerExistsError",
        message: "A customer by that name already exists.",
      });
    }
    if (password.length <= 7) {
      next({
        name: "PasswordLengthError",
        message: "The password must be a minimum of at least 8 characters.",
      });
    } else
      bcrypt.hash(password, SALT_COUNT, async (err, hashed) => {
        passwordHash = hashed;
        const customer = await createCustomer({
          username,
          password: passwordHash,
        });
        console.log("getting the customer in the route", customer);
        const token = jwt.sign(
          { id: customer, username },
          process.env.JWT_SECRET,
          {
            expiresIn: "5w",
          }
        );
        const cart = await createCart(customer.id)
        // delete customer;
        // delete customer.password;
        customer.token = token;
        res.send({ message: "customer was created", customer, cart });
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

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
      localStorage.setItem("customer", customer);
      res.send({ message: "you're logged in!", customer });
    }
    // console.log('my user', user)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = customersRouter;
