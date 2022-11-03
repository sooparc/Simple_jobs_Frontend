import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MainHeader = (props) => {
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");

  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  const history = useHistory();

  const searchHandler = () => {
    let searchParam;
    if (!jobTitle) {
      searchParam = "all";
    } else {
      searchParam = jobTitle;
    }

    let searchParam2;
    if (!city) {
      searchParam2 = "all";
    } else {
      searchParam2 = city;
    }

    history.push(`/searchedjobs/${searchParam}/${searchParam2}`);
  };

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <input
          type="text"
          placeholder="Job Title, keywords, or company"
          onChange={(e) => setJobTitle(e.target.value)}
          className={classes.input1}
        />
        <input
          type="text"
          placeholder="City, state, zip code"
          onChange={(e) => setCity(e.target.value)}
          className={classes.input2}
        />

        <button className={classes.headerBtn} onClick={searchHandler}>
          {searchIcon}
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
