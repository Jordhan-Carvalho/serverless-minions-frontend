import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { user } = useContext(userContext);

  return (
    <Route {...rest}>{user ? children : <Redirect to={`/login`} />}</Route>
  );
}
