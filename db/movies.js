const client = require("./client");


async function createMovies({
  title,
  year,
  rating,
  rating_votes,
  img_url,
  price
}) {
  try {
    const {
      rows: [movie],
    } = await client.query(
      `
        INSERT INTO movies(title, year, rating, rating_votes, img_url, price)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING * ;
        `,
      [title, year, rating, rating_votes, img_url, price]
    );


    return movie;
  } catch (error) {
    console.error(error);
  }
}

async function addGenres(movieGenres, id) {
  try {
    await client.query(`
    UPDATE movies
    SET genre=ARRAY[$1]
    WHERE id=$2;
    `, [movieGenres, id])
  } catch (error) {
    console.error(error);
  }
}

async function getAllMovies() {
  try {
    const { rows } = await client.query(`

        SELECT * FROM movies;

        `);
    return rows;
  } catch (error) {
    console.error(error);
  }
}


async function moviesPaginated(increment, pageSize) {
  try {
    const { rows: movies } = await client.query(`
      SELECT * 
      FROM movies   
      ORDER BY  id
      OFFSET $1 
      LIMIT $2;
      `, [increment * pageSize, pageSize]);

    return movies;
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
    console.error(error);
  }
}

async function getMoviesByGenre(genre) {
  try {
    const {
      data: movies
    } = await client.query(
      ` SELECT * FROM movies
        WHERE genre=$1;
          `,
      [genre]
    );
    return movies;
  } catch (error) {
    throw error;
  }
}

//ADMIN ONLY:

async function deleteMovie(movieId) {
  try {
    const { data: movie } = await client.query(`
        DELETE FROM movies
        WHERE id=$1;
        `, [movieId.id]);
    return movie
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createMovies,
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  getMoviesByGenre,
  deleteMovie,
  addGenres,
  moviesPaginated
}
