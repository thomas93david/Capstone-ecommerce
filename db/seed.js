const client = require("./client");
const faker = require("faker");

const {
  createCustomer,
  createMovies,
  getMovieByTitle,
  getAllMovies,
  createCart,
  createGenres,
  addMovieToCart,
} = require("../db");
async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS movies_cart;
        DROP TABLE IF EXISTS genres;
        DROP TABLE IF EXISTS cart;
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
            CREATE TABLE genres(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );
            CREATE TABLE movies(
                id SERIAL PRIMARY KEY,
                title VARCHAR (255) UNIQUE NOT NULL,
                year VARCHAR(255),
                length VARCHAR(255),
                rating VARCHAR(255),
                rating_votes VARCHAR(255),
                img_url VARCHAR(500),
                price VARCHAR NOT NULL
            );
            CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                "customerId" INTEGER REFERENCES customers(id),
                subtotal VARCHAR (255),
                UNIQUE("customerId")
            );
            CREATE TABLE movies_cart (
                "cartId" INTEGER REFERENCES cart(id),
                "customerId" INTEGER REFERENCES customers(id),
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

async function createInitialCustomers() {
  try {
    console.log("creating intital users..");

    const customer1 = await createCustomer({
      username: "DavidThomas",
      password: "hardcorePorn",
    });
    console.log("this is customer1", customer1);

    const customer2 = await createCustomer({
      username: "Kamikaze1",
      password: "Password1",
    });
    console.log("this is customer2", customer2);

    const customer3 = await createCustomer({
      username: "ChelseWenzel",
      password: "Dork1234",
    });
    console.log("this is customer3", customer3);

    console.log("finsihed creating intitial customers..");
  } catch (error) {
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
    for (i = 0; i < movies.length; i++) {
      const movie = movies[i];
      await createMovies({
        title: movie.title,
        year: movie.year,
        rating: movie.rating || faker.commerce.price(1, 10, 1, ""),
        rating_votes: faker.commerce.price(200, 3000, 0, ""),
        img_url: movie.img_url,
        price: faker.commerce.price(10, 100, 2, "$"),
      });
    }
    console.log("Successful Seed Init Movies!");
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

async function addMovieInCart() {
  console.log("adding movie...");
  try {
    await addMovieToCart("Mulan", 1);
    await addMovieToCart("Dune", 2);
    await addMovieToCart("Hamilton", 3);
    console.log("finished adding movies..");
  } catch (error) {
    console.error(error);
  }
}

async function populateInitialData() {
  try {
    await createInitialCustomers();
    await createInitialGenres();
    await createIntitialMovies();
    await initializeCarts();
    await addMovieInCart();
    // await gettingMovieTitle();
    // await createInitialCart();
    // await addMovieInCart();
    await getAllMovies();
  } catch (error) {
    throw error;
  }
}

// initializes the test run

rebuildDb()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
