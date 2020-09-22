import axios from "axios"


export async function register({ username, password }) {
    console.log("getting to the register function");
    try {
        const { data: { customer: newCustomer } } = await axios.post("/api/customer/register", {
            username: username,
            password: password,

        });
        let customer = newCustomer;

        if (newCustomer) {
            localStorage.setItem("customer", JSON.stringify(newCustomer));
            return customer;
        } else {
            alert("you have not created an account. Please login to access features.");
        }
    } catch (error) {
        throw error;
    }
}

export async function login({ username, password }) {
    try {
        const { data: { customer } } = await axios.post('api/customer/login', {
            username,
            password
        });
        if (customer) {
            localStorage.setItem('customer', JSON.stringify(customer));
            return customer;
        }
    } catch (error) {
        throw error;
    }
}
