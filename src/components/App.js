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
import Pagination from "./Areas/Pagination";

function App() {
  const [customer, setCustomer] = useState({});
  const [cart, setCart] = useState({})

  function localStorageCustomer() {
    if (localStorage.getItem("customer")) {
      const localStorageCustomer = JSON.parse(localStorage.getItem("customer"));
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

  return (
    <Router>
      <div className="app">
        <header>
          <Header customer={customer} setCustomer={setCustomer} />
        </header>
        <Switch>
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
        </Switch>

        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
