import React, { Component } from "react";
import { HashRouter as Router, Route, Swith } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Swith>
              <Route exact path="/" component={Dashboard} />
            </Swith>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
