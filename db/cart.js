const client = require('./client');
async function createCart({ movieTitle, totalPrice, quantity }) {
    try {
        const { rows: [cart] } = await client.query(`
        INSERT INTO cart("movieTitle","totalPrice", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [movieTitle, totalPrice, quantity])
        return cart
    } catch (error) {

    }
}
async function getCartById(id) {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT * FROM cart
             WHERE id = $1
            `, [id]);
        return cart
    } catch (error) {
        throw error
    }
}
module.exports = {
    createCart,
    getCartById
}