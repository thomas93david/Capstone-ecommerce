const client = require("./client");


async function createMovies({ title, year, rating, price }) {
    try {
        const { rows: [movie] } = await client.query(`
        INSERT INTO movies(title, year, rating, price)
        VALUES ($1, $2, $3, $4)
        RETURNING * ;
        `, [title, year, rating, price]);


    return movie;
  } catch (error) {
    console.error(error);
  }
}

async function getAllMovies() {
  try {
    const { rows } = await client.query(
      `
            SELECT * FROM movies;
        `
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getMovieById(id) {
  try {
    const {
      rows: [movie],
    } = await client.query(
      `
        SELECT * FROM movies
        WHERE id=$1;
        `,
      [id]
    );

    return movie;
  } catch (error) {
    console.error(error);
  }
}
async function getMovieByTitle(movieTitle) {
  try {
    const {
      rows: [title],
    } = await client.query(
      `
SELECT title FROM movies
WHERE id= $1;
`,
      [movieTitle]
    );
    return title;
  } catch (error) {
    throw error;
  }
}

async function getMovieByGenre(genre) {
    try {
        const 

    } catch(error) {
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
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  deleteMovie,
};
