const client = require('./client');

async function createGenres(genre){
    try {
        const { rows } = await client.query(`
        INSERT INTO genres(name)
        VALUES ($1)
        RETURNING * ;
        `,[genre]);

        return rows;
        //do I even need to store/return anything at all? -chels
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createGenres
}