import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/inventory-list"
import Restock from "./components/restocking-list"
import Using from "./components/using-list"

// Importing logo
import logo from "./black-twitter-logo.png"

function App() {
  return (
    <Router>
      <div className="container">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://medium.com/@its.martin.beck" target="_blank">
          <img src={logo} width="30" height="30" alt="https://medium.com/@its.martin.beck" />
          </a>
          <Link to="/" className="navbar-brand">MyItems</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
              <Link to="/" className="nav-link">Inventory</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        <Route path="/" exact component={Home} />
        <Route path="/restock/:id" component={Restock} />
        <Route path="/use/:id" component={Using} />
      </div>
    </Router>
      );
}

export default App;
