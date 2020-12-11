const client = require("./client");
const faker = require("faker");
const SALT_COUNT = 11;
const bcrypt = require("bcrypt");

const {
  createCustomer,
  createMovies,
  getMovieByTitle,
  addGenreToMovie,
  getAllMovies,
  createCart,
  createGenres,
  addMovieToCart,
  makeAdmin,
  addGenres,
} = require("../db");
async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS movies_genres;
        DROP TABLE IF EXISTS movies_cart; 
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS genres;
        DROP TABLE IF EXISTS movies;
        DROP TABLE IF EXISTS customers;
    `);
  } catch (error) {
    throw error;
  }
}

// create the tables

//NOTE FROM CHELSEA::
/* I had to remove the NOT NULL constraint from several fields

in order to test the create movie function with the data I have acquired.
since there are fields missing still. once we have all of the seed data present
we can reestablish constraints and clean up code. */

async function createTables() {
  console.log("Starting to build tables...");
  try {
    await client.query(`
              CREATE TABLE customers(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR (255),
                "isAdmin" BOOLEAN default false
            );
              CREATE TABLE movies(
                id SERIAL PRIMARY KEY,
                title VARCHAR (255) UNIQUE NOT NULL,
                year VARCHAR(255),
                length VARCHAR(255),
                rating VARCHAR(255),
                rating_votes VARCHAR(255),
                img_url VARCHAR(500),
                price VARCHAR NOT NULL,
                genre VARCHAR[]
            );
              CREATE TABLE genres(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );
              CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                "customerId" INTEGER REFERENCES customers(id),
                UNIQUE("customerId")
            );
              CREATE TABLE movies_genres (
                id SERIAL PRIMARY KEY,
                "filmId" INTEGER REFERENCES movies(id),
                "genreId" INTEGER REFERENCES genres(id)
            );
            CREATE TABLE movies_cart (
                "cartId" INTEGER REFERENCES cart(id),
                "movieId" INTEGER REFERENCES movies(id),
                quantity INTEGER,
                UNIQUE ("cartId", "movieId")
            );
            `);
  } catch (error) {
    throw error;
  }
}
async function rebuildDb() {
  try {
    console.log("rebuilding db..");

    client.connect();
    await dropTables();
    await createTables();

    console.log("finished rebuilding db..");
  } catch (error) {
    throw error;
  }
}

// async function createInitialCustomers() {
//   try {
//     console.log("creating intital users..");

//     const customer1 = await createCustomer({
//       username: "DavidThomas",
//       password: "hardcorePorn",
//     });
//     console.log("this is customer1", customer1);
//     const makeA = await makeAdmin(1);
//     console.log("makeA....", makeA);
//     const customer2 = await createCustomer({
//       username: "Kamikaze1",
//       password: "Password1",
//     });
//     console.log("this is customer2", customer2);

//     const customer3 = await createCustomer({
//       username: "ChelseaWenzel",
//       password: "Dork1234",
//     });
//     console.log("this is customer3", customer3);

//     console.log("finsihed creating intitial customers..");
//   } catch (error) {
//     throw error;
//   }
// }

async function createInitialCustomers() {
  try {
    console.log("Starting to create users...");
    await new Promise((resolve, reject) => {
      bcrypt.hash("hardcorePorn", SALT_COUNT, async function (
        err,
        hashedPassword
      ) {
        const david = await createCustomer({
          username: "DavidThomas",
          password: hashedPassword,
        });
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      bcrypt.hash("Password1", SALT_COUNT, async function (
        err,
        hashedPassword
      ) {
        const admin = await createCustomer({
          username: "Kamikaze1",
          password: hashedPassword,
        });
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      bcrypt.hash("Dork1234", SALT_COUNT, async function (err, hashedPassword) {
        const james = await createCustomer({
          username: "ChelseaWenzel",
          password: hashedPassword,
        });
        resolve();
      });
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}
async function createInitialGenres() {
  try {
    console.log("Starting Create Genre");
    await createGenres("Action");
    await createGenres("Adventure");
    await createGenres("Animation");
    await createGenres("Biography");
    await createGenres("Comedy");
    await createGenres("Crime");
    await createGenres("Drama");
    await createGenres("Documentary");
    await createGenres("Family");
    await createGenres("Fantasy");
    await createGenres("Horror");
    await createGenres("Musical");
    await createGenres("Mystery");
    await createGenres("Romance");
    await createGenres("Sci-Fi");
    await createGenres("Sport");
    await createGenres("Thriller");
    await createGenres("War");
    await createGenres("Western");

    console.log("Made Genres!");
  } catch (error) {
    console.error(error);
  }
}

async function createIntitialMovies() {
  console.log("making initial movies...");
  try {
    const movies = require("./movies.json");
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      await createMovies({
        title: movie.title,
        year: movie.year,
        rating: movie.rating || faker.commerce.price(1, 10, 1, ""),
        rating_votes: faker.commerce.price(200, 3000, 0, ""),
        img_url: movie.img_url,
        price: faker.commerce.price(10, 100, 2, "$"),
      });
      await addGenres(movie.genre, i);
    }
    console.log("Successful Seed Init Movies!");
  } catch (error) {
    console.error(error);
  }
}

async function addGenreToFilm() {
  console.log("adding genre to movie");
  try {
    await addGenreToMovie({
      filmId: 1,
      genreId: 2,
    });
    console.log("added genre to movie!");
  } catch (error) {
    console.error(error);
  }
}

async function initializeCarts() {
  try {
    console.log("Initializing Cartz..");
    await createCart(1);
    await createCart(2);
    await createCart(3);
  } catch (error) {
    console.error(error);
  }
}
// async function gettingMovieTitle() {
//   try {
//     console.log("getting movie title...");
//     const title = await getMovieByTitle(5);
//     console.log("title..", title);
//     console.log("finished getting movie...");
//   } catch (error) {
//     throw error;
//   }
// }

// async function addMovieInCart() {
//   console.log("adding movie...");
//   try {
//     await addMovieToCart(1, 1);
//     await addMovieToCart(2, 2);
//     await addMovieToCart(17, 3);
//     console.log("finished adding movies..");
//   } catch (error) {
//     console.error(error);
//   }
// }

async function populateInitialData() {
  try {
    await createInitialCustomers();
    await createInitialGenres();
    await createIntitialMovies();
    await addGenreToFilm();
    await initializeCarts();
    // await addMovieInCart();
    // await gettingMovieTitle();
    // await createInitialCart();
    // await addMovieInCart();
    await getAllMovies();
  } catch (error) {
    throw error;
  }
}

// initializes the test run
// async function testDB() {
//   try {
//     const films = await getAllMovies();
//     console.log(films);
//   } catch (error) {
//     console.log(error);
//   }
// }

rebuildDb()
  .then(populateInitialData)
  // .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
