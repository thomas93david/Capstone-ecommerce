import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Areas/Banner";
import MovieList from "./Areas/MovieList";
import Login from "./Areas/Login";
import Register from "./Areas/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Header />
        </header>
        <Switch>
          <Route path="/" exact />
        </Switch>

        <Banner />
        <MovieList />
        <Login />
        <Register />
      </Router>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
