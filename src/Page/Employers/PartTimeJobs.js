import React, { useState, useEffect, useContext } from "react";
import classes from "./PartTimeJobs.module.css";
import AuthContext2 from "../../Page/EmployerUsers/auth-context2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const PartTimeJobs = () => {
  const [companyName, setCompanyName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [period, setPeriod] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userId, setUserId] = useState("");
  // To bring data that user saved before
  const [companyNameRef, setCompanyNameRef] = useState("");
  const [occupationRef, setOccupationRef] = useState("");
  const [salaryRef, setSalaryRef] = useState("");
  const [phoneRef, setPhoneRef] = useState("");
  const [streetRef, setStreetRef] = useState("");
  const [cityRef, setCityRef] = useState("");
  const [stateRef, setStateRef] = useState("");
  const [zipcodeRef, setZipcodeRef] = useState("");

  const axios = require("axios");

  const authCtx2 = useContext(AuthContext2);
  const isLoggedIn = authCtx2.isLoggedIn;
  const lock = <FontAwesomeIcon icon={faLock} />;

  useEffect((index) => {
    const id = localStorage.getItem("user_id");

    axios.get("https://pt-finder.herokuapp.com/employers").then((response) => {
      const newArr = response.data;
      const filteredArr = newArr.find((e) => e.id == id);
      setUserId(filteredArr.id);
    });

    axios
      .get("https://pt-finder.herokuapp.com/parttimejobs")
      .then((response) => {
        const newArr = response.data;
        const filteredArr = newArr.find((e) => e.user_id == id);
        setCompanyNameRef(filteredArr.company_name);
        setOccupationRef(filteredArr.occupation);
        setSalaryRef(filteredArr.salary);
        setPhoneRef(filteredArr.salary);
        setStreetRef(filteredArr.street);
        setCityRef(filteredArr.city);
        setStateRef(filteredArr.state);
        setZipcodeRef(filteredArr.zip_code);
      });
  });

  const editClickHandler = () => {
    axios
      .put("https://pt-finder.herokuapp.com/editparttimejob", {
        companyName: companyName,
        occupation: occupation,
        salary: salary,
        phone: phone,
        schedule: schedule,
        period: period,
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        userId: userId,
      })
      .then((response) => {
        alert("Successfully edited !");
      });
  };

  const submitHandler = (e) => {
    e.preventdefault();
  };

  const saveClickHandler = () => {
    if (isLoggedIn) {
      axios
        .post("https://pt-finder.herokuapp.com/parttimejobs", {
          user_id: userId,
          companyName: companyName,
          occupation: occupation,
          salary: salary,
          phone: phone,
          schedule: schedule,
          period: period,
          street: street,
          city: city,
          state: state,
          zipcode: zipcode,
          userId: userId,
        })
        .then((response) => {
          alert("Successfully saved !");
        });
    } else {
      alert("Please login first!");
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <h3 className={classes.title}>We are HIRING !</h3>

        <form onSubmit={submitHandler}>
          <div className={classes.inputBox}>
            <div className="row">
              <div className="col-md-6">
                <div className={classes.leftContent}>
                  <div className={classes.inputTitle}>
                    <strong>Your Information</strong>
                  </div>

                  <label className={classes.label}>Company Name</label>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder={companyNameRef}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />

                  <div>
                    <label className={classes.label}>Job Title</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={occupationRef}
                      onChange={(e) => setOccupation(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={classes.label}>Salary</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={salaryRef}
                      onChange={(e) => setSalary(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={classes.label}>Phone number</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={phoneRef}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="my-3">
                    <label className={classes.label}>
                      What is the schedule for this job?
                    </label>
                    <select
                      id="schedule"
                      name="schedule"
                      className={classes.input}
                      onChange={(e) => setSchedule(e.target.value)}
                      required
                    >
                      <option value="">----</option>
                      <option value="MON - FRI">MON - FRI</option>
                      <option value="SAT - SUN">SAT - SUN</option>
                      <option value="MON - SUN">MON - SUN</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className={classes.label}>
                      How quickly do you need to hire?
                    </label>
                    <select
                      id="days"
                      name="days"
                      className={classes.input}
                      onChange={(e) => setPeriod(e.target.value)}
                      required
                    >
                      <option value="">----</option>
                      <option value="1 to 3 days">1 to 3 days</option>
                      <option value="3 to 7 days">3 to 7 days</option>
                      <option value="1 to 2 weeks">1 to 2 weeks</option>
                      <option value="2 to 4 weeks">2 to 4 weeks</option>
                      <option value="More than 4 weeks">
                        More than 4 weeks
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className={classes.rightContent}>
                  <div className={classes.inputTitle}>
                    <strong>Location</strong>
                  </div>
                  <div className="mt-4">
                    <label className={classes.label}>Street</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={streetRef}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={classes.label}>City</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={cityRef}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={classes.label}>State</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={stateRef}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={classes.label}>Zip code</label>
                    <input
                      type="text"
                      className={classes.input}
                      placeholder={zipcodeRef}
                      onChange={(e) => setZipcode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className={classes.editBtn} onClick={editClickHandler}>
              Edit
            </button>
            <button className={classes.saveBtn} onClick={saveClickHandler}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartTimeJobs;
