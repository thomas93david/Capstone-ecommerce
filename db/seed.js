const client = require('./client');
const { createCustomer, createMovies } = require('../db');

async function dropTables() {
    try {
        await client.query(`
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
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                "isAdmin" boolean DEFAULT false,
                "isGuest" boolean DEFAULT false
            );
            CREATE TABLE movies(
                id SERIAL PRIMARY KEY,
                "customerId" INTEGER REFERENCES customers(id),
                title VARCHAR (255) UNIQUE NOT NULL,
                genre VARCHAR (255) NOT NULL,
                price INTEGER NOT NULL,
                rated VARCHAR(6)
            );
            CREATE TABLE cart (
                id SERIAL PRIMARY KEY,
                "customerId" INTEGER REFERENCES movies(id),
                "movieId" INTEGER REFERENCES movies(title),
                UNIQUE("customerId", "movieId")
            );
            CREATE TABLE wishlist (
                id SERIAL PRIMARY KEY,
                "customerId" INTEGER REFERENCES customers(id),
                "movieId" VARCHAR(255) REFERENCES movies(id),
                UNIQUE("customerId", "movieId")
            );`);
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

async function populateInitialData() {
    try {
        await createInitialCustomers();

        // const movies = require('movies.json')

        // movies.map((m) => {
        //     return {

        //     }
        // }).forEach(insertIntoMoviesTable)

        // await getInitialUser();
        // await createInitialLinks();
        // // await createInitialTags();
        // // await createJointTagLink();
        // // await deleteLinksTagsPair();
        // // await deleteTag();
        // await getInitialLinks();
        // await getLinksFromTags();
        // // await addTagsToLinkObjectTest();
        // await updateInitialLinks();
        // await clickClick();
        // await getTags();
    } catch (error) {
        throw error;
    }
}

// initializes the test run

rebuildDb()
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end());