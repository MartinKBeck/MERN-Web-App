import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./components/inventory-list"
import Update from "./components/modify-list"
import Change from "./components/create-remove"


// Importing logo
import logo from "./black-twitter-logo.png"

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
                <Link to="/update" className="nav-link">Restock/Use</Link>
              </li>
              <li className="navbar-item">
                <Link to="/change" className="nav-link">Create/Remove Items</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        <Route path="/" exact component={Home} />
        <Route path="/update/" component={Update} />
        <Route path="/change" component={Change} />
      </div>
    </Router>
      );
}

export default App;
