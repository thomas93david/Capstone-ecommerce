import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import MovieList from "./MovieList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact />
          </Switch>
        </Router>
      </header>
      <Banner></Banner>
      <MovieList></MovieList>
      <footer></footer>
    </div>
  );
}

export default App;
