import React, { useState, useEffect, useContext } from "react";
import { useHistory, generatePath } from "react-router-dom";
import classes from "./LikedJobs.module.css";
import { Card } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContext from "../../Page/EmployeeUsers/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import loginImg from "../../Assets/loginRequest.png";

const axios = require("axios");

const LikedJobs = () => {
  const [liked, setLiked] = useState([]);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const warningIcon = <FontAwesomeIcon icon={faCircleQuestion} />;

  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://simple-jobs.herokuapp.com/likedjobs")
      .then((response) => {
        if (response.data) {
          setLiked(response.data);
        }
      });
  }, []);

  const removeClickHandler = (index) => {
    let tempArr = [...liked];
    const companyname = tempArr[index].company_name;
    const deleted = tempArr[index];

    axios
      .delete(`https://simple-jobs.herokuapp.com/remove/${companyname}`)
      .then((response) => {
        const newArr = tempArr.filter((e) => e !== deleted);
        setLiked(newArr);
      });
  };

  // go to clicked job details page
  const btnClickHandler = (index) => {
    const newArr = [...liked];
    const id = newArr[index].id;
    history.push(generatePath(`/jobdetails/${id}`));
  };

  return (
    <div className={classes.body}>
      {isLoggedIn ? (
        <>
          <div className={classes.header}>
            <hr className={classes.hrLine} />
          </div>

          <div className="row">
            {liked.length === 0 && (
              <div className={classes.warningContainer}>
                <div className={classes.warningIcon}>{warningIcon}</div>
                <div className={classes.warning}>
                  No jobs have been added yet
                </div>
              </div>
            )}
            {liked.map((e, i) => (
              <div className="col-md-3 mt-5" key={i}>
                <div className={classes.container}>
                  <Card className={classes.card}>
                    <Card.Body>
                      <div className="text-end">
                        <i
                          className="fa-solid fa-x"
                          style={{ cursor: "pointer" }}
                          onClick={() => removeClickHandler(i)}
                        ></i>
                      </div>
                      <Card.Title className="mt-3">
                        <strong>{e.company_name}</strong>
                      </Card.Title>
                      <Card.Subtitle className="mt-3 text-muted">
                        {e.occupation}
                      </Card.Subtitle>
                      <Card.Text>
                        <button
                          className={classes.applyBtn}
                          onClick={() => btnClickHandler(i)}
                        >
                          More details
                        </button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={classes.container2}>
          <p className={classes.loginMessageTitle}>Login Required</p>
          <img src={loginImg} className={classes.loginImg} alt={loginImg} />
          <p className={classes.loginMessage}>
            Please <a href="/login">login</a> or<span> </span>
            <a href="/signup">sign up</a> <span> </span>to see saved jobs.
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedJobs;
