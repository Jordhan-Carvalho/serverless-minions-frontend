import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Amplify, Auth, Storage } from "aws-amplify";

import { userContext } from "./contexts/UserContext";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound";
import ProdPage from "./pages/ProdPage/ProdPage";
import OrdersPage from "./pages/OrdersPage";
import config from "./utils/awsConfig";
import "./reset.css";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "minions",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
      {
        name: "orders",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
      {
        name: "send-email",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

function App() {
  const { setUser } = useContext(userContext);
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const { idToken } = await Auth.currentSession();
      const url = await Storage.get(idToken.payload.picture);
      setUser({ ...idToken.payload, picture: url });
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/minion/:id" component={ProdPage} />
        <Route path="/orders" component={OrdersPage} />
        {/* <AuthenticatedRoute path="/orders" component={OrdersPage} /> */}
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
