
const client = require("./client");
// async function createCart({ movieTitle, totalPrice, quantity }) {
//     try {
//         const { rows: [cart] } = await client.query(`
//         INSERT INTO cart("movieTitle", "totalPrice", quantity)
//         VALUES ($1, $2, $3)
//         RETURNING *;
//         `, [movieTitle, totalPrice, quantity])
//         return cart
//     } catch (error) {

//     }
// }
async function createCart(customerId) {
  try {
    const { rows: [cart] } = await client.query(`
      INSERT INTO cart("customerId")
      VALUES ($1);
      `, [customerId]);

    return cart;
  } catch (error) {
    console.error(error);
  }
}





//update
async function addMovieToCart(cartId, movieId) {
  try {
    await client.query(
      `
        INSERT INTO movies_cart("cartId","movieId")
        VALUES ($1, $2);
        
        `,
      [movieId, cartId]
    );
  } catch (error) {
    console.error(error);
  }
}

//read
async function getCartByCustomer(customerId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            SELECT * FROM cart
             WHERE "customerId"=$1;
            `,
      [customerId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

//add movies to cart (movies_cart table, brett)
async function addMovieToCart(movieId, cartId, quantity) {
  try {
    await client.query(`
        INSERT INTO movies_cart("movieId", "cartId", quantity)
        VALUES ($1, $2, $3);
        `, [movieId, cartId, quantity]);

  } catch (error) {
    console.error(error);
  }
}

//read

//grabs the cartId from the users cart:
//(identifies the cart associated to the user:: cart table, brett).
async function getCartIdByCustomerId(customerId) {
  try {
    const { rows: [cartId] } = await client.query(`
            SELECT id FROM cart
             WHERE "customerId"=$1
             RETURNING *;
            `, [customerId]);
    return cartId;
  } catch (error) {
    throw error
  }

}

//grabs movies associated with said cart id:
//(movies_cart table, brett)
async function getMoviesByCart(cartId) {
  try {
    const { rows: movies } = await client.query(`
        SELECT c.id, m.title, m.price, m.img_url, mc.quantity
        FROM cart as c
        JOIN movies_cart as mc ON c.id = mc."cartId"
        JOIN movies as m ON "movieId" = m.id
        WHERE c.id = $1
        RETURNING *;
        `, [cartId]);

    return movies;

  } catch (error) {
    console.error(error);
  }
}

//delete

async function removeMovieFromCart(movieTitle) {
  try {
    await client.query(
      `
        DELETE FROM cart
        WHERE "movieTitle"=$1;
        `,
      [movieTitle]
    );
  } catch (error) {
    console.error(error);
  }
}



//removing items from cart (movies_cart table, brett)
async function removeMovieFromCart(movieId, cartId) {
  try {
    await client.query(`
        DELETE FROM movies_cart
        WHERE "movieId"=$1
            AND "cartId"=$2;
        `, [movieId, cartId]);
  } catch (error) {
    console.error(error);
  }
}

//update quantity (movies_cart table, brett):
async function updateQuantity(newQuantity) {
  try {
    await client.query(`
        UPDATE movies_cart
        SET quantity=$1;
        `, [newQuantity]);

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createCart,
  getCartIdByCustomerId,
  getMoviesByCart,
  addMovieToCart,
  removeMovieFromCart,
  updateQuantity,
}

