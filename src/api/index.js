import { CastConnectedSharp } from "@material-ui/icons";
import axios from "axios";

export async function register({ username, password }) {
  console.log("getting to the register function");
  try {
    const {
      data: { customer: newCustomer },
    } = await axios.post("/api/customer/register", {
      username: username,
      password: password,
    });
    let customer = newCustomer;
    console.log("This is the customer:", customer);

    // if (newCustomer) {
    // localStorage.setItem("customer", JSON.stringify(newCustomer));
    return customer;
    // } else {
    // alert("you have not created an account. Please login to access features.");
    // }
  } catch (error) {
    throw error;
  }
}

export async function login({ username, password }) {
  try {
    const {
      data: { customer },
    } = await axios.post("api/customer/login", {
      username,
      password,
    });
    if (customer) {
      localStorage.setItem("customer", JSON.stringify(customer));
      return customer;
    }
  } catch (error) {
    throw error;
  }
}
export async function getAllMovies() {
  try {
    const { data: movies } = await axios.get("api/movies");
    return movies;
  } catch (error) {
    throw error;
  }
}
export async function getMoviesById(id) {
  try {
    const {
      data: { movie },
    } = await axios.get(`api/movies/${id}`);
    return movie;
  } catch (error) {
    throw error;
  }
}
export async function addMovieToCart(movieId, cartId, quantity) {
  try {
    console.log("getting here to the axios call");
    const result = await axios.post(`api/cart`, {
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        movieId: movieId,
        cartId: cartId,
        quantity: quantity,
      }),
    });
    // await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function getCustomer(customerId) {
  console.log("getting the customer");
  let customer = await axios.get(`api/customer/${customerId}`, {
    // headers: {
    //     "content-type": "application/json",
    //     "Authorization": `Bearer ${JSON.parse(localStorage.getItem("customer")).token}`
    // }
  });
  // console.log("real token...", JSON.parse(localStorage.getItem("customer")).token);

  console.log("this is the customer please work...", customer);
  return customer;
}

export async function getGenres() {
  try {
    const { data: genres } = await axios.get("api/genres");
    const genreNames = genres.map((genre) => {
      return genre.name;
    });
    console.log("genres in fetch", genreNames);
    return genreNames;
  } catch (error) {
    console.error(error);
  }
}

export async function createCart() {
  console.log("hello world");
  try {
    console.log("getting the cart");
    // customerId = await axios.get(`api/customer/getcustomer`, {
    //     headers: {
    //         "content-type": "application/json",
    //         "Authorization": `Bearer ${JSON.parse(localStorage.getItem("customer")).token}`
    //     }

    // });
    // customerId = getCustomer()
    // console.log("getting to the customer", customerId)
    const cart = await axios.post(`api/cart`);
    console.log("this is the cart with", cart);
    return cart;
  } catch (error) {
    console.error(error);
  }
}

export async function customerList() {
  try {
    const { data: customers } = await axios.get("api/admin/customers", {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("customer")).token
        }`,
      },
    });
    console.log("customers in fetch", customers);
    return customers;
  } catch (error) {
    console.error(error);
  }
}

export async function adminCustomerDelete(customerId, cartId) {
  try {
    const { data: customer } = await axios.delete(
      `api/admin/customers/${customerId}/${cartId}`
    );
    console.log("deleted customer", customer);
    return customer;
  } catch (error) {
    console.error(error);
  }
}

export async function adminMovieCreate() {
  try {
    const { data: movie } = await axios.post(`api/admin/movies`);
    console.log("this is the created movie", movie);
    return movie;
  } catch (error) {
    console.error(error);
  }
}

export async function adminDeleteMovies(movieId) {
  try {
    const { data: movie } = await axios.delete(`api/admin/movies/${movieId}`);
    return movie;
  } catch (error) {
    console.error(error);
  }
}

//hey brett, check this out:

export async function getUserCart() {
  try {
    const customerId = localStorage.getItem("customer").id;
    const data = await axios.get(`api/cart/${customerId}`);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addMovieToDBCart(movieId, customerId) {
  try {
    // const customerId = localStorage.getItem("customer").id;
    // console.log("um hello?", customerId);
    await axios.post(`api/cartRoute/${customerId}`, {
      headers: { "content-type": "application/json" },
      body: {
        movieId: movieId,
        quantity: 1,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMovieFromDB(movieId, quantity) {
  try {
    const customerId = localStorage.getItem("customer").id;
    await axios.delete(`api/cartRoute/${customerId}`, {
      headers: { "content-type": "application/json" },
      body: {
        movieId: movieId,
        quantity: quantity,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

//since I dont do nothin. xoxo
