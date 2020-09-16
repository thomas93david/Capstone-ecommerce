const client = require('./client');


async function createCustomer({ username, password }) {
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
module.exports = {
    createCustomer
}