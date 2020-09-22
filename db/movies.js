const client = require("./client");


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

    return movie;
  } catch (error) {
    console.error(error);
  }
}

async function getAllMovies() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM movies
        RETURNING *;
        `);
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
        const { rows: [title] } = await client.query(`
            SELECT title FROM movies
            WHERE id= $1;
            `, [movieTitle]);
        return title;
    } catch (error) {
        console.error(error);
    }
}

async function getMovieByGenre(genre) {
  try {
    const { data: [category] } = await client.query(
      ` SELECT genre FROM movies
      ON CONFLICT (title) DO NOTHING
            WHERE id=$1;
          `, [genre]);
    return category
  } catch (error) {
    throw error
  }
}

//ADMIN ONLY:

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
  getMovieByGenre,
  deleteMovie,
};
