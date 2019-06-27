import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./Chat";
import Home from "./Home";

const Routes = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />​
      <Route path="/chat" component={Chat} />​
    </div>
  </Router>
);

export default Routes;
