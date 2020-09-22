const client = require('./client');
const bcrypt = require('bcrypt')


async function createCustomer({username, password}) {
    try {
        const {
            rows: [customer],
        } = await client.query(`
    INSERT INTO customers(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *; 
    `, [username, password]);

        return customer;
    } catch (error) {
        throw error
    }
}

async function getCustomerById(customerId) {
    try {
        // grabs the user by the "customerId"
        // that is made inside our seed.js/50
        const { rows: [customer] } = await client.query(`
      SELECT *
      FROM customers
      WHERE id=${customerId}
    `);
        // if there is no user there will not be a userid so return null
        if (!customer) {
            return null
        }
        // sets the userobject to the posts and the call the getpost by the user while passing in userid?
        return customer;
    } catch (error) {
        throw error;
    }
}
async function getCustomerByUsername(username) {
    try {
        const { rows: [customer] } = await client.query(`
    SELECT * from customers WHERE username=$1;
    `, [username]);
        if (!customer || customer.length === 0) {
            return null
        }
        return customer
    } catch (error) {
        throw error
    }
}
async function getCustomer({ username, password }) {
    try {
        const customer = await getCustomerByUsername(username);

        if (!customer) {
            return;
        }
        const matchingPassword = bcrypt.compareSync(password, customer.password);

        if (!matchingPassword) {
            return;
        }
        return customer;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    createCustomer,
    getCustomerById,
    getCustomerByUsername,
    getCustomer
}