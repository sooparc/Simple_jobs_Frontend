import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Profile.module.css";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTrashCan,
  faPenToSquare,
  faLock,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Page/EmployeeUsers/auth-context";
import loginImg from "../../Assets/loginRequest.png";

const axios = require("axios");

const Profile = () => {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [showA, setShowA] = useState(false);
  const [userId, setUserId] = useState("");
  const email = <FontAwesomeIcon icon={faEnvelope} />;
  const trashCan = <FontAwesomeIcon icon={faTrashCan} />;
  const edit = <FontAwesomeIcon icon={faPenToSquare} />;
  const user = <FontAwesomeIcon icon={faCircleUser} />;

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();

  // when the user clicks delete account button, the message pops up to ask again
  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    axios.get("https://pt-finder.herokuapp.com/users").then((response) => {
      const newArr = response.data;
      const user_id = localStorage.getItem("userId");
      const filteredObj = newArr.find((e) => e.id == user_id);
      console.log(filteredObj);
      setUserId(filteredObj.id);
      setUsername(filteredObj.username);
      setEmailAddress(filteredObj.email);
    });
  }, []);

  // The delete button in a message pop up. It will delete the user's account
  const deleteAccount = () => {
    axios
      .delete(`https://pt-finder.herokuapp.com/delete/${userId}`)
      .then((response) => {
        console.log("deleted");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        authCtx.logout();
        history.push("/");
      });
  };

  return (
    <div className={classes.body}>
      {isLoggedIn ? (
        <>
          <div className={classes.container}>
            <div className={classes.title}>
              <div className={classes.profile}>Profile</div>
              <hr />
              <div className={classes.header}>
                <span className={classes.userIcon}>{user}</span>
                <div className="mt-3">
                  <strong>Username: </strong>
                  {username}
                </div>

                <div className="mt-2">
                  <strong>Email Address:</strong> {emailAddress}
                </div>
              </div>

              <div className="text-center mt-4">
                <a href="/resume" className={classes.editLink}>
                  {edit}
                  <span> </span>Edit Resume
                </a>

                <button
                  className={classes.deleteBtn}
                  onClick={() => setShowA(true)}
                >
                  {trashCan}
                  <span style={{ marginRight: "3px" }}> </span> Delete Account
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={classes.container2}>
          <p className={classes.loginMessageTitle}>Login Required</p>
          <img src={loginImg} className={classes.loginImg} />
          <p className={classes.loginMessage}>
            Please <a href="/login">login</a> or<span> </span>
            <a href="/signup">sign up</a> <span> </span>to create a profile.
          </p>
        </div>
      )}

      <Toast show={showA} onClose={toggleShowA} className={classes.toast}>
        <Toast.Header>
          <strong className="me-auto">Delete Account</strong>
        </Toast.Header>
        <Toast.Body>
          Are you sure you want to delete your account?
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button
              className={classes.cancelButton}
              onClick={() => setShowA(false)}
            >
              Cancel
            </button>
            <button className={classes.deleteButton} onClick={deleteAccount}>
              Delete
            </button>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Profile;
