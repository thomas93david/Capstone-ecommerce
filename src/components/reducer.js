export const initialState = {
  cart: [],
  // total: 0,
  // subtotal: 0
};

// //example of a SELECTOR
// export const getCartTotal = (cart) =>
//   cart.reduce((amount, movie) => movie.price + amount, 0);
// console.log(amount);

// export const getCartTotal = (cart) => {
//   const total = cart.reduce(
//     (amount, movie) => movie.price + amount,
//     console.log("Can I hit this")
//   );
//   Number(total);
//   console.log("Subtotal is", total);
// };

export function total(cart) {
  const getCartTotal = cart?.reduce((amount, movie) => {
    //calculate total
    let total = movie.price.match(/\d./g).join(""); //parse string to integer(cost)
    return amount + Number(total);
  }, 0);

  console.log("total:", getCartTotal);
  return getCartTotal;
}
let newTotal = total();
console.log("newTotal is:", newTotal);
// const productReducer = (state = initialState, action => {
//   switch(action.type) {
//     //update single item price
//     case Types.UPDATE_ITEM_PRICE:
//       return {
//         ...state,
//         subtotal: action.subtotal,
//         total:
//       };

//   }
// })

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
