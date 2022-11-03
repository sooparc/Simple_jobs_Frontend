import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./EmployerLogin.module.css";
import AuthContext from "./auth-context2";

const EmployerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const axios = require("axios");
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const loginClickHandler = () => {
    axios
      .post("https://pt-finder.herokuapp.com/employerlogin", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(response.data.message);
        } else {
          localStorage.setItem("employerToken", response.data.employerToken);
          localStorage.setItem("user_id", response.data.result[0].id);
          authCtx.login(response.data.employerToken);
          history.push("/homepage");
        }
      });
  };

  useEffect(() => {
    axios
      .get("https://pt-finder.herokuapp.com/employerlogin")
      .then((response) => {
        if (response.data.loggedIn === true) {
          localStorage.getItem("employerToken");
        }
      });
  }, []);

  return (
    <div>
      <div className={classes.body}>
        <div className={classes.container}>
          <div className={classes.overlay}>
            <div className={classes.login}>
              <h1>Welcome</h1>
              <div className={classes.loginForm}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <div style={{ color: "red", marginBottom: "20px" }}>
                  {loginStatus}
                </div>
                <button className={classes.button} onClick={loginClickHandler}>
                  Login
                </button>
              </div>

              <a href="#" className={classes.link}>
                Forgot password?
              </a>

              <a href="/employersignup" className={classes.link}>
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerLogin;
