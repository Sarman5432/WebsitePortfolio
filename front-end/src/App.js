import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link, Redirect
} from "react-router-dom";
import { Home } from "./pages";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
