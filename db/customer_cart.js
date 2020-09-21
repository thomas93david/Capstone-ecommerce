const client = require('./client');
async function getCustomerCart(customerId) {
    try {
        const { rows: customer } = await client.query(
            `
				SELECT *
				FROM users_cart
				WHERE "customerId"=$1
				;
			`,
            [customerId]
        );
        return customer;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCustomerCart,
}


