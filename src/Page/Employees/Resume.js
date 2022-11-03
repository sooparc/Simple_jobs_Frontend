import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Resume.module.css";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AuthContext from "../../Page/EmployeeUsers/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const axios = require("axios");

const Resume = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [getId, setGetId] = useState("");
  // To duplicate work experice input
  const [inputFields, setInputFields] = useState([
    { jobtitle: "", company: "", description: "", start: "", end: "" },
  ]);

  // To bring user's data from MYSQL and it will show in the inputs
  const [firstnameRef, setFirstnameRef] = useState("");
  const [lastnameRef, setLastnameRef] = useState("");
  const [phoneRef, setPhoneRef] = useState("");
  const [headlineRef, setHeadlineRef] = useState("");
  const [summaryRef, setSummaryRef] = useState("");
  const [cityRef, setCityRef] = useState("");
  const [stateRef, setStateRef] = useState("");
  const [zipcodeRef, setZipcodeRef] = useState("");

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const lock = <FontAwesomeIcon icon={faLock} />;

  const history = useHistory();

  const handleChangeInput = (index, e) => {
    const values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
  };

  // duplicate work experience input form
  const addClickHandler = () => {
    setInputFields([
      ...inputFields,
      { jobtitle: "", company: "", description: "", start: "", end: "" },
    ]);
  };
  // remove work experience input form
  const removeClickHandler = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  useEffect(() => {
    axios.get("https://pt-finder.herokuapp.com/users").then((response) => {
      const newArr = response.data;
      const user_id = localStorage.getItem("userId");
      const filteredObj = newArr.find((e) => e.id == user_id);
      setGetId(filteredObj.id);
      setFirstnameRef(filteredObj.firstname);
      setLastnameRef(filteredObj.lastname);
      setPhoneRef(filteredObj.phonenumber);
      setHeadlineRef(filteredObj.headline);
      setSummaryRef(filteredObj.summary);
      setCityRef(filteredObj.city);
      setStateRef(filteredObj.state);
      setZipcodeRef(filteredObj.zipcode);
    });
  });

  let id = getId;

  // use axios put to post/edit user's information
  const saveClickHandler = (index, id) => {
    if (isLoggedIn) {
      axios
        .put("https://pt-finder.herokuapp.com/editresume", {
          firstname: firstname,
          lastname: lastname,
          phonenumber: phonenumber,
          headline: headline,
          summary: summary,
          city: city,
          state: state,
          zipcode: zipcode,
          inputFields: inputFields,
          id: getId,
        })
        .then((response) => {
          alert("Successfully saved !!");
        });
    } else {
      alert("Please login first!");
      history.push("/login");
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>My resume</h2>
          <hr className="mb-4" />

          <div>
            <label className={classes.inputLabel}>
              First Name <strong>(Required)</strong>
            </label>
            <input
              type="text"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder={firstnameRef}
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.inputLabel}>
              Last Name <strong>(Required)</strong>
            </label>
            <input
              type="text"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              placeholder={lastnameRef}
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.inputLabel}>Phone number</label>
            <input
              type="text"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder={phoneRef}
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.inputLabel}>Headline</label>
            <input
              type="text"
              onChange={(e) => {
                setHeadline(e.target.value);
              }}
              placeholder={headlineRef}
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.inputLabel}>Summary</label>
            <textarea
              onChange={(e) => {
                setSummary(e.target.value);
              }}
              placeholder={summaryRef}
              className={classes.textarea}
            />
          </div>
          <div>
            <label className={classes.inputLabel}>City</label>
            <input
              type="text"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              placeholder={cityRef}
              className={classes.input}
            />
          </div>
          <div>
            <label className={classes.inputLabel}>State</label>
            <select
              onChange={(e) => {
                setState(e.target.value);
              }}
              placeholder={stateRef}
              className={classes.input}
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="mb-5">
            <label className={classes.inputLabel}>Zip code</label>
            <input
              type="text"
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
              placeholder={zipcodeRef}
              className={classes.input}
            />
          </div>
          <h2>Work experience</h2>
          <hr />

          <div>
            <form>
              {inputFields.map((inputField, index) => (
                <div key={index}>
                  <label className={classes.inputLabel}>Job title</label>
                  <input
                    type="text"
                    name="jobtitle"
                    value={inputField.jobtitle}
                    onChange={(e) => handleChangeInput(index, e)}
                    className={classes.input}
                  />
                  <label className={classes.inputLabel}>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={inputField.company}
                    onChange={(e) => handleChangeInput(index, e)}
                    className={classes.input}
                  />
                  <label className={classes.inputLabel}>Description</label>
                  <textarea
                    name="description"
                    value={inputField.description}
                    onChange={(e) => handleChangeInput(index, e)}
                    className={classes.textarea}
                  />
                  <label className={classes.inputLabel} htmlFor="start">
                    From
                  </label>
                  <input
                    type="month"
                    id="start"
                    name="start"
                    min="1980-01"
                    max="2022-12"
                    value={inputField.start}
                    onChange={(e) => handleChangeInput(index, e)}
                    className={classes.input}
                  />
                  <label className={classes.inputLabel} htmlFor="end">
                    To
                  </label>
                  <input
                    type="month"
                    id="end"
                    name="end"
                    min="1980-01"
                    max="2022-12"
                    value={inputField.end}
                    onChange={(e) => handleChangeInput(index, e)}
                    className={classes.input}
                  />

                  <div className={classes.icons}>
                    <IconButton onClick={() => removeClickHandler(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={addClickHandler}>
                      <AddIcon />
                    </IconButton>
                  </div>

                  <hr />
                </div>
              ))}
            </form>
          </div>

          <button
            className={classes.saveBtn}
            onClick={() => saveClickHandler(id)}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
