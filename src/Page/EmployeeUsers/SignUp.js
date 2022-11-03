import React, { useEffect, useState } from "react";
import classes from "./SignUp.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// To make password stronger (at least 8 characters)
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignUp = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);

  const { errors } = formState;

  function onFormSubmit(data) {
    console.log(JSON.stringify(data, null, 4));
    return false;
  }

  axios.defaults.withCredentials = true;

  const history = useHistory();

  const registerClickHandler = () => {
    if (passwordReg.length >= 8) {
      axios
        .post("https://pt-finder.herokuapp.com/signup", {
          username: usernameReg,
          email: emailReg,
          password: passwordReg,
        })
        .then((response) => {
          console.log(response);
          history.push("/login");
        });
    } else {
      console.log("password is shorter than 8 characters");
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.overlay}>
          <div className={classes.login}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className={classes.loginForm}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsernameReg(e.target.value)}
                  className="mt-3"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  onChange={(e) => setEmailReg(e.target.value)}
                />

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register("password")}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setPasswordReg(e.target.value)}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>

                <button
                  className={classes.button}
                  onClick={registerClickHandler}
                >
                  Sign Up
                </button>

                <a href="/login" className={classes.link}>
                  Already have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
