import React, { useEffect, useState, useContext } from "react";
import classes from "./Login.module.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "./auth-context";

axios.defaults.withCredentials = true;

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleClose = () => setShowModal(false);

  const login = () => {
    axios
      .post("https://simple-jobs.herokuapp.com/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(response.data.message);
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.result[0].id);
          authCtx.login(response.data.token);
          history.push("/");
        }
      });
  };

  useEffect(() => {
    axios.get("https://simple-jobs.herokuapp.com/login").then((response) => {
      if (response.data.loggedIn === true) {
        localStorage.getItem("token");
      }

      let pop_status = localStorage.getItem("showModal");
      if (!pop_status) {
        setShowModal(true);
        localStorage.setItem("showModal", true);
      }
    });
  }, []);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>WELCOME</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modalDivider}>
          <div
            className={classes.modalTitle1}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Looking For Part Time Jobs
          </div>

          <a href="/homepage" className={classes.modalTitle2}>
            Looking For Employees
          </a>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={classes.body}>
        <div className={classes.container}>
          <div className={classes.overlay}>
            <div className={classes.login}>
              <div className={classes.loginBoxTitle}>Welcome</div>
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
                <button onClick={login} className={classes.button}>
                  Login
                </button>
              </div>

              <a href="/" className={classes.link}>
                Forgot password?
              </a>

              <a href="/signup" className={classes.link}>
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
