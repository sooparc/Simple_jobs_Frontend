import React, { useEffect, useState } from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import Heart from "react-heart";
import classes from "./Home.module.css";
import styled from "styled-components";

const button1 = "Job Feed";
const button2 = "Saved Jobs";

const Button = styled.button`
  background-color: #fff;
  color: #858585;
  border: none;
  font-size: 21px;
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
`;

const ButtonToggle = styled(Button)`
  ${({ active }) =>
    active &&
    `
color: #000;
border-bottom: 4px solid #B2D2E7;
transition: 0.2s;
`}
`;

const Home = () => {
  const [companies, setCompanies] = useState(null);
  const [showLikedJobs, setShowLikedJobs] = useState(false);
  const [showJobFeed, setShowJobFeed] = useState(true);
  const [active, setActive] = useState(button1);

  const { id } = useParams();
  const history = useHistory();
  const axios = require("axios");

  useEffect(() => {
    // bring companies data & user's saved jobs from MYSQL
    axios.get("https://pt-finder.herokuapp.com/companies").then((res) => {
      axios
        .get("https://pt-finder.herokuapp.com/likedjobs")
        .then((response) => {
          let liked = response.data;
          let tempCompanies = res.data;
          let likedCompanies = liked.map((item) => item.company_name);

          // bring user's saved jobs
          tempCompanies.forEach((e, index) => {
            if (likedCompanies.includes(e.company_name)) {
              tempCompanies[index]["isLiked"] = true;
            } else {
              tempCompanies[index]["isLiked"] = false;
            }
          });
          setCompanies(tempCompanies);
        });
    });
  }, []);

  const heartClickHandler = (index) => {
    let tempArr = [...companies];
    const companyname = tempArr[index].company_name;

    if (tempArr[index] && tempArr[index]["isLiked"]) {
      tempArr[index]["isLiked"] = false;
      axios
        .delete(`https://pt-finder.herokuapp.com/remove/${companyname}`)
        .then((response) => {
          console.log("Deleted!");
        });
    } else {
      tempArr[index]["isLiked"] = true;

      const id = tempArr[index].id;
      const bringUserId = localStorage.getItem("userId");
      const userid = bringUserId;
      const companyname = tempArr[index].company_name;
      const occupation = tempArr[index].occupation;

      axios
        .post("https://pt-finder.herokuapp.com/liked", {
          id: id,
          userid: userid,
          companyname: companyname,
          occupation: occupation,
        })
        .then((response) => {
          console.log("Saved!");
        });
    }
    setCompanies(tempArr);
  };

  // go to clicked job details page
  const linkClickHandler = (data) => {
    let id = data.id;
    history.push(generatePath(`/jobdetails/${id}`));
  };

  // show the list of liked jobs
  const Modal = () => {
    const filteredArr = companies.filter((e) => e.isLiked);

    return (
      <div className={classes.likedJobsBody}>
        {filteredArr.map((a, i) => (
          <ul className="list-group list-group-flush" key={i}>
            <li className="list-group-item">
              {a.company_name} -
              <span className="text-muted">{a.occupation}</span>
              <div
                style={{
                  width: "20px",
                  display: "inline-block",
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              ></div>
            </li>
          </ul>
        ))}
      </div>
    );
  };

  return (
    <div className={classes.body}>
      <div className={classes.tabs}>
        <ButtonGroup>
          <ButtonToggle
            active={active === button1}
            onClick={() => setActive(button1)}
          >
            <div
              className={classes.tab}
              onClick={() => {
                setShowJobFeed(true);
                setShowLikedJobs(false);
              }}
            >
              Job feed
            </div>
          </ButtonToggle>
          <ButtonToggle
            active={active === button2}
            onClick={() => setActive(button2)}
          >
            <div
              className={classes.tab}
              onClick={() => {
                setShowLikedJobs(true);
                setShowJobFeed(false);
              }}
            >
              Saved Jobs
            </div>
          </ButtonToggle>
        </ButtonGroup>
      </div>

      {showLikedJobs === true ? (
        <Modal />
      ) : (
        <div className="row">
          {companies &&
            companies.map((data, i) => (
              <div className="col-md-3" key={i}>
                <div className={classes.card}>
                  <div className="card-body">
                    <div
                      style={{
                        width: "1.5rem",
                        display: "block",
                        marginLeft: "auto",
                      }}
                    >
                      <Heart
                        isActive={data.isLiked}
                        onClick={() => {
                          heartClickHandler(i);
                        }}
                      />
                    </div>

                    <a
                      onClick={() => linkClickHandler(data, i)}
                      className="card-title"
                      style={{
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      {data.company_name}
                    </a>

                    <div className=" card-subtitle my-2 text-muted">
                      {data.occupation}
                    </div>
                    <div className="card-text">
                      {data.street}
                      <br />
                      {data.city}, {data.state}, {data.zip_code}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
