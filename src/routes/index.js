import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Chat from "./Chat";
import Home from "./Home";

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/chat/:name/:room" component={Chat} />
    </div>
  </BrowserRouter>
);

export default Routes;
