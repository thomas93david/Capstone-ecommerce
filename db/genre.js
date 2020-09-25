const client = require("./client");

async function createGenres(genre) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO genres(name)
        VALUES ($1)
        RETURNING * ;
        `,
      [genre]
    );

    return rows;
    //do I even need to store/return anything at all? -chels
  } catch (error) {
    throw error;
  }
}
async function getAllGenres() {
  try {
    const { rows: genre } = await client.query(`
        SELECT *
        FROM genres;
      `);

    return genre;
  } catch (error) {
    throw error;
  }
}

async function getGenreById(genresId) {
  try {
    const {
      rows: [genre],
    } = await client.query(
      `
      SELECT *
      FROM genres
      WHERE id=$1
      `,
      [genresId]
    );
    return genre;
  } catch (error) {
    throw error;
  }
}

async function addGenreToMovie({ filmId, genreId }) {
  try {
    const {
      rows: [genreToMovie],
    } = await client.query(
      `
      INSERT INTO movies_genres ("filmId", "genreId")
      VALUES ($1, $2)
      RETURNING *;
      `,
      [filmId, genreId]
    );
    return genreToMovie;
  } catch (error) {
    console.error("Genre not joined to Movie!");
    throw error;
  }
}

module.exports = {
  createGenres,
  getAllGenres,
  getGenreById,
  addGenreToMovie,
};
