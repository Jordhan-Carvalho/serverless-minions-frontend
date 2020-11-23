import { Auth } from "aws-amplify";
import React, { useState, createContext } from "react";

export const userContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState("");

  const logOut = async () => {
    await Auth.signOut();
    setUser("");
  };

  return (
    <userContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </userContext.Provider>
  );
}
