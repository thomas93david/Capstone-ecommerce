const client = require('./client');

//read our cart for the movies that are in it. 
async function readCartMovies(){
    try {
        const {rows: movies} = await client.query(`
        SELECT id, title, price FROM movies
        LEFT JOIN users_cart ON "movieId" = id
        RETURNING *; 
        `, );
        console.log(movies);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    readCartMovies
}