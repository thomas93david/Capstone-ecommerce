function getUserFromStorage() {
    const customer = JSON.parse(localStorage.getItem("customer"))

    if (!customer) {
        console.log('No customer Found')
        return {}
    }

    return customer
}

export default {
    getUserFromStorage
}