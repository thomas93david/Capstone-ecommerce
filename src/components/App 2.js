import React from "react";
import Header from "./Header";
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
      <body>Hello World</body>
      <footer></footer>
    </div>
  );
}

export default App;
