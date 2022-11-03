import React, { useEffect, useContext } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Page/Employees/Home";
import MainNavbar from "./Layout/Employees/MainNavbar";
import MainHeader from "./Components/MainHeader";
import MainFooter from "./Layout/Employees/MainFooter";
import Companies from "./Components/Companies";
import Login from "./Page/EmployeeUsers/Login";
import SignUp from "./Page/EmployeeUsers/SignUp";
import Profile from "./Page/Employees/Profile";
import Resume from "./Page/Employees/Resume";
import JobDetails from "./Page/Employees/JobDetails";
import AuthContext from "./Page/EmployeeUsers/auth-context";
import AuthContext2 from "./Page/EmployerUsers/auth-context2";
import SearchedJobs from "./Page/Employees/SearchedJobs";
import LikedJobs from "./Page/Employees/LikedJobs";
// employer page
import Homepage from "./Page/Employers/Homepage";
import SecondNavbar from "./Layout/Employers/SecondNavbar";
import EmployerLogin from "./Page/EmployerUsers/EmployerLogin";
import NewAccount from "./Page/EmployerUsers/EmployerSignup";
import PartTimeJobs from "./Page/Employers/PartTimeJobs";
import OneTimeJobs from "./Page/Employers/OneTimeJobs";
import Payment from "./Page/Employers/Payment";

const App = () => {
  const authCtx = useContext(AuthContext);
  const authCtx2 = useContext(AuthContext2);
  useEffect(() => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    let employerToken = localStorage.getItem("employerToken");
    token && authCtx.login(token);
    employerToken && authCtx2.login(employerToken);
  }, []);

  return (
    <>
      <Route path="/" exact>
        <MainNavbar />
        <MainHeader />
        <Companies />
        <Home />
        <MainFooter />
      </Route>

      <Route path="/searchedjobs/:jobId/:cityId" exact>
        <MainNavbar />
        <SearchedJobs />
        <MainFooter />
      </Route>

      <Route path="/likedJobs" exact>
        <MainNavbar />
        <LikedJobs />
      </Route>

      <Route path="/login" exact>
        <MainNavbar />
        <Login />
      </Route>

      <Route path="/signup" exact>
        <MainNavbar />
        <SignUp />
      </Route>

      <Route path="/profile" exact>
        <MainNavbar />
        <Profile />
      </Route>

      <Route path="/resume" exact>
        <MainNavbar />
        <Resume />
      </Route>

      <Route path="/jobdetails/:id" exact>
        <MainNavbar />
        <JobDetails />
      </Route>

      {/* employers page */}

      <Route path="/homepage" exact>
        <SecondNavbar />
        <Homepage />
      </Route>

      <Route path="/employerlogin" exact>
        <SecondNavbar />
        <EmployerLogin />
      </Route>

      <Route path="/employersignup" exact>
        <SecondNavbar />
        <NewAccount />
      </Route>

      <Route path="/parttimejobs" exact>
        <SecondNavbar />
        <PartTimeJobs />
      </Route>

      <Route path="/onetimejobs" exact>
        <SecondNavbar />
        <OneTimeJobs />
      </Route>

      <Route path="/payment" exact>
        <SecondNavbar />
        <Payment />
      </Route>
    </>
  );
};

export default App;
