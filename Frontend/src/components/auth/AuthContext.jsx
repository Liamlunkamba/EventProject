import React, { createContext, useState } from "react";
// now going to create a  context which will createContext function which will then 
//store and provide authentication-related data to compenents
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //The Authprovider is a component that wraps the child components and provides authentication
  //to all of it's users
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //isLoggedIn holds or provides a boolean value indicating whether the user is logged in  
  const [user, setUser] = useState(null);
//User holds the logged-in user's data
  const login = (userData) => {
    //Login updates the user state with the provided data and sets isLoggedIn to tre
    setUser(userData);
    console.log("here",userData);
    setIsLoggedIn(true);
  };
//Logout resets the user state and sets isLoggedIn to false 
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
    //The AuthProvide component uses the AuthContext.Provider to pass down the authentication data
    //For example, isLoggedIn, user) and functions(login, logout) to any child component
  );
};
