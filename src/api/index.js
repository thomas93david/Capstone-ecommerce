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
        localStorage.setItem("customer", JSON.stringify(newCustomer));
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
        const { data: { movie } } = await axios.get(`api/movies/${id}`)
        return movie
    } catch (error) {
        throw error
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
                quantity: quantity
            }),
        })
        // await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}
export async function getCustomer(customerId) {
    console.log("getting the customer")
    let customer = await axios.get(`api/customer/${customerId}`, {
        // headers: {
        //     "content-type": "application/json",
        //     "Authorization": `Bearer ${JSON.parse(localStorage.getItem("customer")).token}`
        // }
    })
    console.log("real token...", JSON.parse(localStorage.getItem("customer")).token)

    console.log("this is the customer please work...", customer)
    return customer
};


export async function createCart() {
    console.log("hello world")
    try {
        console.log("getting the cart")
        // customerId = await axios.get(`api/customer/getcustomer`, {
        //     headers: {
        //         "content-type": "application/json",
        //         "Authorization": `Bearer ${JSON.parse(localStorage.getItem("customer")).token}`
        //     }

        // });
        // customerId = getCustomer()
        // console.log("getting to the customer", customerId)
        const cart = await axios.post(`api/cart`);
        console.log("this is the cart with", cart)
        return cart
    } catch (error) {
        console.error(error)
    }

}
