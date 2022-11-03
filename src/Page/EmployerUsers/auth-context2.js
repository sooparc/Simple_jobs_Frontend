import React, { useState } from "react";

const AuthContext2 = React.createContext({
  employerToken: "",
  isLoggedIn: false,
  login: (employerToken) => {},
  logout: () => {},
});

export const AuthContextProvider2 = (props) => {
  const [employerToken, setEmployerToken] = useState(null);

  const userIsLoggedIn = !!employerToken;

  const loginHandler = (employerToken) => {
    setEmployerToken(employerToken);
  };

  const logoutHandler = () => {
    setEmployerToken(null);
  };

  const contextValue = {
    employerToken: employerToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext2.Provider value={contextValue}>
      {props.children}
    </AuthContext2.Provider>
  );
};

export default AuthContext2;
