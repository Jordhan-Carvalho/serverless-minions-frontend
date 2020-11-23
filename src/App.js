import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound";
import ProdPage from "./pages/ProdPage";
import "./reset.css";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/minion/:id" component={ProdPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
:root {
  --lightBlue: #0A75BC;
  --lightYellow: #F4DD4B;
  --darkYellow: #F6C616;
  --darkBlue: #0C457A;
  --fontRoboto: "Roboto", sans-serif;
}

body {
  font-family: var(--fontRoboto);
}

`;
