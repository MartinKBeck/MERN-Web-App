import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./components/inventory-list"
import Update from "./components/modify-list"
import Create from "./components/create-item"
import Remove from "./components/remove-item"


// Importing logo
import logo from "./black-twitter-logo.png"

function App() {
  return (
    <Router>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{marginBottom: "20px"}}>
          <a className="navbar-brand" href="https://medium.com/@its.martin.beck">
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
                <Link to="/create" className="nav-link">Create Items</Link>
              </li>
              <li className="navbar-item">
                <Link to="/remove" className="nav-link">Remove Items</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        <Route path="/" exact component={Home} />
        <Route path="/update/" component={Update} />
        <Route path="/create/" component={Create} />
        <Route path="/remove/" component={Remove} />
    </Router>
      );
}

export default App;
