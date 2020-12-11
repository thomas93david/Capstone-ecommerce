const client = require("./client");
const bcrypt = require("bcrypt");
const { getCartIdByCustomerId } = require("./cart");

async function createCustomer({ username, password }) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
    INSERT INTO customers(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *; 
    `,
      [username, password]
    );

    return customer;
  } catch (error) {
    throw error;
  }
}

async function getAllCustomers() {
  try {
    const data = await client.query(`
    SELECT * FROM customers;
    `);
    return data.rows;
  } catch (error) {
    throw error;
  }
}

async function makeAdmin(customerId) {
  try {
    const cId = await getCustomerById(customerId);
    console.log("this is the customerId", cId.id);
    const { data: customer } = await client.query(
      `
    UPDATE customers
    SET "isAdmin"=true
    WHERE id=$1;
    `,
      [cId.id]
    );
    return customer;
  } catch (error) {
    console.error(error);
  }
}
async function deleteCustomer(customerId, cartId) {
  try {
    const cId = await getCustomerById(customerId);
    console.log("is this the cid", cId);
    cartId = await getCartIdByCustomerId(cId.id);
    console.log("this is the CID in the backend..", cartId);
    await client.query(
      `
    DELETE FROM cart 
    WHERE "customerId"=$1 and id=$2 ;
    `,
      [cId.id, cartId.id]
    );
    const { data: customer } = await client.query(
      `
        DELETE FROM customers
        WHERE id=$1;
        `,
      [cId.id]
    );

    console.log("is this the cartId?", cartId.id);
    return customer;
  } catch (error) {
    console.error(error);
  }
}

async function getCustomerById(customerId) {
  try {
    // grabs the user by the "customerId"
    // that is made inside our seed.js/50
    const {
      rows: [customer],
    } = await client.query(
      `
      SELECT *
      FROM customers
      WHERE id=$1
    `,
      [customerId]
    );
    // if there is no user there will not be a userid so return null
    if (!customer) {
      return null;
    }
    // sets the userobject to the posts and the call the getpost by the user while passing in userid?
    return customer;
  } catch (error) {
    throw error;
  }
}
async function getCustomerByUsername(username) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
    SELECT * from customers WHERE username=$1;
    `,
      [username]
    );
    if (!customer || customer.length === 0) {
      return null;
    }
    return customer;
  } catch (error) {
    throw error;
  }
}
async function getCustomer({ username, password }) {
  try {
    const customer = await getCustomerByUsername(username);

    if (!customer) {
      return;
    }
    console.log("Hitting in customers db", username, password);
    const matchingPassword = bcrypt.compareSync(password, customer.password);

    if (!matchingPassword) {
      return;
    }
    return customer;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCustomer,
  getCustomerById,
  makeAdmin,
  getAllCustomers,
  deleteCustomer,
  getCustomerByUsername,
  getCustomer,
};
