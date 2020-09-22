const client = require('./client');
// async function createCart({ movieTitle, totalPrice, quantity }) {
//     try {
//         const { rows: [cart] } = await client.query(`
//         INSERT INTO cart("movieTitle", "totalPrice", quantity)
//         VALUES ($1, $2, $3)
//         RETURNING *;
//         `, [movieTitle, totalPrice, quantity])
//         return cart
//     } catch (error) {

//     }
// }
//create
async function createCart(customerId){
    try {
        const {rows: [cart]} = await client.query(`
        INSERT INTO cart("customerId")
        VALUES ($1)
        RETURNING *;
        `, [customerId]);

        return cart;
    } catch (error) {
        console.error(error);
    }
}

//update
async function addMovieToCart(movieTitle, cartId){
    try {
        const {rows: [movie]} = await client.query(`
        UPDATE cart
        SET "movieTitle"=$1
        WHERE id=$2
        RETURNING *;
        `,[movieTitle, cartId]);

        return movie;
    } catch (error) {
        console.error(error);
    }
}

//read
async function getCartByCustomer(customerId) {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT * FROM cart
             WHERE "customerId"=$1;
            `, [customerId]);
        return cart
    } catch (error) {
        throw error
    }
}

//delete
async function removeMovieFromCart(movieTitle){
    try {
        await client.query(`
        DELETE FROM cart
        WHERE "movieTitle"=$1;
        `,[movieTitle]);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createCart,
    getCartByCustomer,
    addMovieToCart,
    removeMovieFromCart
}