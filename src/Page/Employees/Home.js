import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, generatePath } from "react-router-dom";
import Heart from "react-heart";
import classes from "./Home.module.css";
import styled from "styled-components";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useParams } from "react-router-dom";
import AuthContext from "../EmployeeUsers/auth-context";

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
border-bottom: 4px solid #D3E4F3;
transition: 0.1s;
`}
`;

const Home = () => {
  const [companies, setCompanies] = useState(null);
  const [showLikedJobs, setShowLikedJobs] = useState(false);
  const [showJobFeed, setShowJobFeed] = useState(true);
  const [active, setActive] = useState(button1);

  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [occupation, setOccupation] = useState("");

  const [jobDetail, setJobDetail] = useState("");
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const id = useParams();
  const mapElement = useRef();

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const axios = require("axios");
  const history = useHistory();

  useEffect(() => {
    // bring companies data & user's saved jobs from MYSQL
    axios.get("https://simple-jobs.herokuapp.com/companies").then((res) => {
      setJobDetail(res.data[0]);
      setLatitude(res.data[0].latitude);
      setLongitude(res.data[0].longitude);

      axios
        .get("https://simple-jobs.herokuapp.com/likedjobs")
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
  }, [axios, id.id]);

  // when the users apply for a job

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("https://simple-jobs.herokuapp.com/users").then((response) => {
        const tempArr = response.data;
        const user_id = localStorage.getItem("userId");
        const filteredUser = tempArr.find((e) => e.id == user_id);

        setUserId(filteredUser.id);
        setFirstname(filteredUser.firstname);
        setLastname(filteredUser.lastname);
        setPhone(filteredUser.phonenumber);
      });
    }
  }, [axios, isLoggedIn]);

  useEffect(() => {
    let map = tt.map({
      key: "IZAA6GH9vFq56WSpmttQBQyST1h6IZES",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    });

    setMap(map);

    const addMarker = () => {
      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });
    };

    addMarker();
    return () => map.remove();
  }, [axios, id.id, latitude, longitude]);

  const heartClickHandler = (index) => {
    let tempArr = [...companies];
    const companyname = tempArr[index].company_name;

    if (tempArr[index] && tempArr[index]["isLiked"]) {
      tempArr[index]["isLiked"] = false;
      axios
        .delete(`https://simple-jobs.herokuapp.com/remove/${companyname}`)
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
        .post("https://simple-jobs.herokuapp.com/liked", {
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
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setJobDetail(data);
  };

  const moreDetailHandler = (data) => {
    console.log(data);
    let id = data.id;
    history.push(generatePath(`/jobdetails/${id}`));
  };

  const applyClickHandler = () => {
    if (!isLoggedIn) {
      alert("Please login first!");
      history.push("/login");
    } else if (firstname === null) {
      alert("Please fill out the resume form first! ");
      history.push("/resume");
    } else {
      axios
        .post("https://simple-jobs.herokuapp.com/applied_jobs", {
          user_id: userId,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          company_name: companyname,
          occupation: occupation,
        })
        .then((response) => {
          alert("Succesfully applied :)");
        });
    }
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
        <div className={classes.container}>
          <div className={classes.leftContainer}>
            {companies &&
              companies.map((data, i) => (
                <div className={classes.card} key={i}>
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
                    <div
                      onClick={() => linkClickHandler(data, i)}
                      className={classes.cardTitle}
                    >
                      {data.company_name}
                    </div>

                    <div className=" card-subtitle my-2 text-muted">
                      {data.occupation}
                    </div>
                    <div className="card-text">
                      {data.street}
                      <br />
                      {data.city}, {data.state}, {data.zip_code}
                    </div>
                    <button
                      className={classes.detailBtn}
                      onClick={() => moreDetailHandler(data, i)}
                    >
                      More detail
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <section className={classes.rightContainer}>
            <div className={classes.detailCard}>
              <div className="card-body">
                <div className={classes.detailCardTitle}>
                  <h4>{jobDetail.occupation}</h4>
                  <h5>{jobDetail.company_name}</h5>
                  <small className="text-muted">
                    {jobDetail.street}, {jobDetail.state}, {jobDetail.zip_code}
                  </small>
                  <button
                    className={classes.applyBtn}
                    onClick={applyClickHandler}
                  >
                    Apply now
                  </button>
                </div>
                {map && (
                  <div>
                    <div ref={mapElement} className={classes.map}></div>
                  </div>
                )}
                <h6 className="card-subtitle my-2 text-muted">
                  ${jobDetail.salary}
                  <span> per hour</span>
                </h6>
                <div className={classes.detailCardText}>
                  <p className="card-text">
                    {jobDetail.company_name} is seeking an experienced
                    <strong>
                      <span> </span>
                      {jobDetail.occupation}
                    </strong>{" "}
                    for a part time role.
                  </p>
                  <p>Please contact {jobDetail.phone} for more details.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
