const client = require('./client');

async function addMovieToCart(movieId, cartId) {
    try {
        const {
            rows: [movie_cart],
        } = await client.query(
            `
            INSERT INTO users_cart ("movieId", "cartId" )
            VALUES ($1, $2)
            ON CONFLICT ("movieId", "cartId") DO NOTHING
            RETURNING *;
        `,
            [movieId, cartId]
        );
        console.log("join movie to cart", movieId, cartId)







        return movie_cart;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addMovieToCart
}