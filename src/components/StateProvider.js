//Think of Redux as creating global variables that can be passed
// around in a React app, instead of passing props

//setting up data layer with REACT Context API - REACT Redux
//this helps keep track of the cart
import React, { createContext, useContext, useReducer } from "react";

//This is the data layer
export const StateContext = createContext();

//Build a provider & set it up on index.js
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//This allows us to use it inside of a component
export const useStateValue = () => useContext(StateContext);

//EVERYTHING ABOVE IS HOW YOU WOULD SETUP REDUX EVERTIME
