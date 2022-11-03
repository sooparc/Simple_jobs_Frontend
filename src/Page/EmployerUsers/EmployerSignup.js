import React, { useState } from "react";
import classes from "./EmployerSignup.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const EmployerSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const axios = require("axios");
  const history = useHistory();

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters"),
    passwordConfirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Please make sure your passwords match"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);

  const { errors } = formState;

  function onFormSubmit(data) {
    console.log(JSON.stringify(data, null, 4));
    return false;
  }

  const SignupClickHandler = () => {
    console.log(password);
    if (password.length >= 8) {
      axios
        .post("https://pt-finder.herokuapp.com/employersignup", {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          position: position,
        })
        .then((response) => {
          console.log(response);
          history.push("/employerlogin");
        });
    } else {
      console.log("password is shorter than 8 characters");
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.containerTitle}>Create an Employer Account</div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mt-5">
            <label className={classes.inputLabel}>Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={classes.passwordInput}>
            <label className={classes.inputLabel}>Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "31%" }}
              required
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className={classes.passwordInput}>
            <label className={classes.inputLabel}>Confirm Password</label>
            <input
              type="password"
              {...register("passwordConfirm")}
              className={`form-control ${
                errors.passwordConfirm ? "is-invalid" : ""
              }`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "31%" }}
              required
            />
            <div className="invalid-feedback">
              {errors.passwordConfirm?.message}
            </div>
          </div>

          <div>
            <label className={classes.inputLabel}>First Name</label>
            <input
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={classes.inputLabel}>Last Name</label>
            <input
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={classes.inputLabel}>Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={classes.inputLabel}>Phone number</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={classes.inputLabel}>
              What position are you hiring for
            </label>
            <input
              type="text"
              placeholder="ex) Cashier, Dog sitter.."
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <button className={classes.saveBtn} onClick={SignupClickHandler}>
            Save
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/employerlogin" className={classes.accountLink}>
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;
