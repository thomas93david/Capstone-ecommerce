//Data layer Logic goes here
//everytime you  dispatch an action, into the data layer,
//you need to return the new data

export const initialState = {
  cart: [],
  //   user: null,.....next step with checkout
};

const reducer = (state, action) => {
  //Switch = look at a bunch of cases
  // takes in a action
  //always add console.log above the action to debug
  console.log(action);

  switch (action.type) {
    case "ADD_TO_CART":
      //Logic for adding item to cart
      return {
        //return the entire state(lines 4-5)
        //returning the state and then you overwrite the
        //value of the cart with a new value
        ...state,
        cart: [...state.cart, action.movie],
        //return the cart's state and add 1
      };

    case "REMOVE_FROM_CART":
      //Logic for removing item from cart

      //cloned the cart
      let newCart = [...state.cart];

      //
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      //item exists, remove/cut/splice from cart
      if (index >= 0) {
        newCart.splice(index, 1);
      }

      //returns the enite state AND the newCart
      return { ...state, cart: newCart };

    //If nothing changes, return the state
    default:
      return state;
  }
};

export default reducer;
