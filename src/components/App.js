import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import MoviePage from "./pages/MoviePage";
import AdminPage from "./pages/AdminPage";
import "./App.css";
import { useStateValue } from "./StateProvider";

function App() {
  const [customer, setCustomer] = useState({});
  const [customerlist, setCustomerList] = useState({});
  const [{ cart }, dispatch] = useStateValue();
  // const [cart, setCart] = useLocalStorage("cart");

  // let moviez;
  // let setCart = localStorage.setItem("cart", moviez)

  // function useLocalStorage(localItem) {
  //   const [localState, setLocalState] = useState(
  //     localStorage.getItem(localItem)
  //   );

  //   function setLocation(newItem) {
  //     localStorage.setItem(localItem, newItem);
  //     setLocalState(newItem);
  //   }
  //   return [localState, setLocation];
  // }

  // const [cart, setCart] = useState({});

  // const customersCart = JSON.parse(localStorage.getItem("cart"));

  // const ALL_CART = localStorage.getItem("cart")
  //   ? JSON.parse(localStorage.getItem("cart"))
  //   : [ALL_CART];

  // const setCartInLocalStorage = () => {
  //   dispatch({
  //     type: "SET_CART_LS",
  //     cart: customer.id,
  //   });
  // };
  // localStorage.setItem("cart", JSON.stringify(cart));

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [setCartInLocalStorage]);

  //adding items to local storage when we load the whole app not just checkout page.

  return (
    <Router>
      <div className="app">
        <header>
          <Header customer={customer} setCustomer={setCustomer} />
        </header>
        <Switch>
          {customer.isAdmin ? (
            <Route
              path="/admin"
              exact
              render={() => (
                <AdminPage
                  customerlist={customerlist}
                  setCustomerList={setCustomerList}
                />
              )}
            />
          ) : (
            <>
              <Route
                path="/register"
                exact
                render={() => (
                  <RegisterPage customer={customer} setCustomer={setCustomer} />
                )}
              />
              <Route
                path="/login"
                exact
                render={() => (
                  <LoginPage customer={customer} setCustomer={setCustomer} />
                )}
              />
              <Route
                path="/checkout"
                exact
                component={CheckoutPage}
                // cart={cart}
                customer={customer}
                setCustomer={setCustomer}
              />
              <Route
                path="/movies"
                render={(props) => <MoviePage {...props} customer={customer} />}
                // component={MoviePage}
                // customer={customer}
              />
              <Route path="/" exact component={Home} customer={customer} />
            </>
          )}
        </Switch>
        <footer>
          <Footer customer={customer} />
        </footer>
      </div>
    </Router>
  );
}

export default App;
