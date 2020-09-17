const client = require('./client');
const { createCustomer,
    createMovies,
    getMovieByTitle,
    createCart,
    getCartById } = require('../db');
const { addMovieToCart } = require('../db/movie_cart')
const cartRouter = require('../routes/cartRoute');
const { getMovieById } = require('./movies');
async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS users_cart;
        DROP TABLE IF EXISTS wishlist;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS movies;
        DROP TABLE IF EXISTS customers;
    `);
    } catch (error) {
        throw error;
    }
}

// create the tables

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
                genre VARCHAR (255) NOT NULL,
                price INTEGER NOT NULL,
                rated VARCHAR(10)
            );
            CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                "movieTitle" VARCHAR (255) REFERENCES movies(title),
                "totalPrice" INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                UNIQUE( "movieTitle")
            );
            CREATE TABLE wishlist (
                "wishlistId" INTEGER REFERENCES cart(id),
                UNIQUE ("wishlistId")
            );
            CREATE TABLE users_cart (
                "cartId" INTEGER REFERENCES cart(id),
                "movieId" INTEGER REFERENCES movies(id),
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

async function createIntitialMovies() {
    console.log('making initial movies...')
    try {
        const movie1 = await createMovies({
            title: "2012",
            genre: "action",
            price: 500.00,
            rated: "5 star"
        });
        console.log("first movie...", movie1);
        const movie2 = await createMovies({
            title: "Good Will hunting",
            genre: "Drama",
            price: 1100.00,
            rated: "E"
        })
        console.log("second movie...", movie2)
        console.log("finsihed making movies..")
    } catch (error) {

    }
}
async function gettingMovieTitle() {
    try {
        console.log("getting movie title...")
        const title = await getMovieByTitle(1);
        console.log("title..", title)
        console.log("finished getting movie...")
    } catch (error) {
        throw error
    }
}

async function createInitialCart() {
    console.log("creating cart...");
    try {
        const cart = await createCart({
            movieTitle: "2012",
            totalPrice: 500.00,
            quantity: 1
        })
        console.log("this is the cart...", cart);
        console.log("finished creating cart...")

    } catch (error) {
        throw error
    }
}
async function addMovieInCart() {
    console.log("adding movie...")
    try {
        const movieId = await getMovieById(2)
        const addMovie = await addMovieToCart(1, movieId)

        const getCart = await getCartById(1, addMovie)

        console.log("trying to add movie id...", movieId)
        console.log('added movie', addMovie);
        console.log("getting new cart", getCart)
        console.log("finsihed adding")
    } catch (error) {
        throw error
    }
}



async function populateInitialData() {
    try {
        await createInitialCustomers();
        await createIntitialMovies();
        await gettingMovieTitle();
        await createInitialCart();
        await addMovieInCart();

        // const movies = require('movies.json')

        // movies.map((m) => {
        //     return {

        //     }
        // }).forEach(insertIntoMoviesTable)
    } catch (error) {
        throw error;
    }
}

// initializes the test run

rebuildDb()
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end());