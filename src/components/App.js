import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import MoviePage from "./pages/MoviePage";

function App() {
  const [customer, setCustomer] = useState({})
  function localStorageCustomer() {
    if (localStorage.getItem("customer")) {
      const localStorageCustomer = localStorage.getItem("customer");
      return localStorageCustomer;
    } else {
      return {};
    }
  }
  useEffect(() => {
    setCustomer(localStorageCustomer());
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <Header />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movies" exact component={MoviePage} />
          <Route path="/register" exact render={() => <RegisterPage customer={customer} setCustomer={setCustomer} />} />
          <Route path="/login" exact render={() => <LoginPage customer={customer} setCustomer={setCustomer} />} />
          <Route path="/checkout" exact component={CheckoutPage} />
        </Switch>

        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App
