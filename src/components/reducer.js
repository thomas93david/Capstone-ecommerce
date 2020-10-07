export const initialState = {
  cart: [],
};

//example of a SELECTOR
export const getCartTotal = (cart) =>
  cart?.reduce((amount, movie) => movie.price + amount, 0);
console.log("This is subtotal cart");

// export const getCartTotal = (cart) => {
//   const total = (amount, movie) => movie.price + amount;
//   console.log("Subtotal is", cart.reduce(total));
// };

const reducer = (state, action) => {
  console.log("action in reducer.js", action);

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.movie],
      };

    case "CREATE_CART":
      return {
        ...state,
        cart: [...action.cart],
      };

    case "REMOVE_FROM_CART":
      let newCart = [...state.cart];
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      if (index >= 0) {
        newCart.splice(index, 1);
      }
      return { ...state, cart: newCart };

    // case "SET_CART_LS":
    //   let updateCart = [...state.cart.cart];
    //   const setCart = localStorage.getItem("cart")
    //     ? JSON.parse(localStorage.getItem("cart"))
    //     : [updateCart];

    //   return {
    //     ...state,
    //     cart: setCart,
    //   };

    //If nothing changes, return the state
    default:
      return state;
  }
};

export default reducer;
