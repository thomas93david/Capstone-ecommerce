import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import MoviePage from "./pages/MoviePage";
import "./App.css";
<<<<<<< Updated upstream
import Pagination from "./Areas/Pagination";
import AdminPage from "./pages/AdminPage";

function App() {
  const [customer, setCustomer] = useState({});
  const [cart, setCart] = useState({})
  const [customerlist, setCustomerList] = useState({})

  function localStorageCustomer() {
    if (localStorage.getItem("customer")) {

      const localStorageCustomer = JSON.parse(localStorage.getItem("customer"));
      console.log("does this show Isadmin....", customer);
      return localStorageCustomer;
    } else {
      return {};
    }
  }
  function localStorageCart() {
    if (localStorage.getItem("customer")) {

      const localStorageCart = localStorage.getItem("cart")
      return localStorageCart

    } else {
      return {}
    }
  }

  useEffect(() => {
    setCustomer(localStorageCustomer());
  }, []);

  useEffect(() => {
    setCart(localStorageCart());
  }, [])
=======
// import Pagination from "./Areas/Pagination";
import { useStateValue } from "./StateProvider";

function App() {
  const [customer, setCustomer] = useState({});
  //lets do unto customer what we did for cart ay?^^
  // const [cart, setCart] = useState({})
  
  //pull it in everywhere fuck setCart cant coexist.
    const [{ cart }] = useStateValue();

    useEffect(()=>{
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  //adding items to local storage when we load the whole app not just checkout page.
>>>>>>> Stashed changes

  return (
    <Router>
      <div className="app">
        <header>
          <Header customer={customer} setCustomer={setCustomer} />
        </header>
        <Switch>
<<<<<<< Updated upstream
          {customer.isAdmin ?
            <Route
              path="/admin"
              exact
              render={() => (
                <AdminPage customerlist={customerlist} setCustomerList={setCustomerList} />
              )}
            /> : <>
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
              <Route path="/checkout" exact component={CheckoutPage} cart={cart} setCart={setCart} customer={customer} setCustomer={setCustomer} />
              <Route path="/movies" exact component={MoviePage} />
              <Route path="/" exact component={Home} />
            </>}
=======
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
          <Route path="/checkout" exact component={CheckoutPage} customer={customer} setCustomer={setCustomer} />
          <Route path="/movies" exact component={MoviePage} />
          <Route path="/" exact component={Home} />
>>>>>>> Stashed changes
        </Switch>

        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
