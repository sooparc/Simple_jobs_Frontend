import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFile,
  faAddressCard,
  faHeart,
  faBriefcase,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLogo from "../../Assets/NavbarLogo.png";
import { useHistory } from "react-router-dom";
import AuthContext from "../../Page/EmployeeUsers/auth-context";
import classes from "./MainNavbar.module.css";

const MainNavbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const user = <FontAwesomeIcon size="lg" icon={faUser} />;
  const resume = <FontAwesomeIcon size="lg" icon={faFile} />;
  const profile = <FontAwesomeIcon size="lg" icon={faAddressCard} />;
  const heart = <FontAwesomeIcon size="lg" icon={faHeart} />;
  const employer = <FontAwesomeIcon size="lg" icon={faBriefcase} />;
  const home = <FontAwesomeIcon size="lg" icon={faHouse} />;
  const history = useHistory();

  return (
    <Navbar
      expand={false}
      style={{ position: "fixed" }}
      className={classes.navbarIcon}
    >
      <Container fluid>
        <Navbar.Brand href="/" className="nav-justified">
          <img style={{ width: "60%" }} src={NavbarLogo} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src={NavbarLogo}
                style={{
                  width: "55%",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
                alt="NavbarLogo"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/" className={classes.offcanvasLink}>
                <span className="mx-3">{home}</span>
                Home
              </Nav.Link>
              {!isLoggedIn && (
                <Nav.Link href="/login" className={classes.offcanvasLink}>
                  <span className="mx-3"> {user} </span> Login / Sign up
                </Nav.Link>
              )}

              <Nav.Link href="/profile" className={classes.offcanvasLink}>
                <span className="mx-3">{profile}</span>
                Profile
              </Nav.Link>
              <Nav.Link href="/likedjobs" className={classes.offcanvasLink}>
                <span className="mx-3">{heart}</span>
                Saved Jobs
              </Nav.Link>
              <Nav.Link href="/resume" className={classes.offcanvasLink}>
                <span className="mx-3"> {resume} </span> My resume
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link href="/homepage" className={classes.offcanvasLink}>
                <span className="mx-3">{employer}</span>
                Employer
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link
                  className={classes.offcanvasLink}
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    authCtx.logout();
                    history.push("/");
                    alert("Successfully logged you out!");
                  }}
                >
                  <span className="mx-3"> {user} </span> Sign out
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
