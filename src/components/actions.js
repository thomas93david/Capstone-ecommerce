export const ADD_TO_CART = ({ id, title, rating, price, year, image }) => ({
    type: "ADD_TO_CART",
    movie: {
        id,
        title,
        rating,
        price,
        year,
        image,
    },
})

export const CREATE_CART = ({ cart }) => ({
    type: 'CREATE_CART',
    cart: [ ...cart ]
})