const client = require('./client');

async function createMovies({ title, year, rating,
                              rating_votes, img_url, price }) {
    try {
        const { rows: [movie] } = await client.query(`
        INSERT INTO movies(title, year, rating, rating_votes, img_url, price)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING * ;
        `, [title,
            year,
            rating,
            rating_votes,
            img_url,
            price]);

        return movie
    } catch (error) {
        console.error(error);
    }
}

async function getMovieById(id) {
    try {
        const { rows: [movie] } = await client.query(`
        SELECT * FROM movies
        WHERE id=$1;
        `, [id]);

        return movie;
    } catch (error) {
        console.error(error);
    }
}
async function getMovieByTitle(movieTitle) {
    try {
        const { rows: [title] } = await client.query(`
SELECT title FROM movies
WHERE id= $1;
`, [movieTitle]);
        return title
    } catch (error) {
        throw error
    }
}




async function deleteMovie(id) {
    try {
        await client.query(`
        DELETE FROM movie
        WHERE id=$1;
        `);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createMovies,
    getMovieById,
    deleteMovie,
    getMovieByTitle
}
