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
  const [cart, setCart] = useState([]);
  // const [{ cart }] = useStateValue();
  console.log("this is cart state in app.js", cart);
  
  useEffect(()=>{
    const localData = localStorage.getItem("cart");
    if (localData){
      setCart(localData)
    }
  }, []);

  
  
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
                customer={customer}
                setCustomer={setCustomer}
                cart={cart}
                // setCart={setCart}
              />
              <Route
                path="/movies"
                render={(props) => <MoviePage {...props} customer={customer}/>}
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
