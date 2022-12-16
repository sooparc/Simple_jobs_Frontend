import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import SecondBrandLogo from "../../Assets/SecondBrandLogo.png";
import NavbarLogo from "../../Assets/NavbarLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faUser,
  faComputerMouse,
  faBriefcase,
  faGem,
  faHouse,
  faHouseChimneyUser,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext2 from "../../Page/EmployerUsers/auth-context2";
import classes from "./SecondNavbar.module.css";

const SecondNavbar = () => {
  const recruiter = <FontAwesomeIcon icon={faUserPen} />;
  const user = <FontAwesomeIcon size="lg" icon={faUser} />;
  const post = <FontAwesomeIcon size="lg" icon={faComputerMouse} />;
  const membership = <FontAwesomeIcon size="lg" icon={faGem} />;
  const employee = <FontAwesomeIcon size="lg" icon={faBriefcase} />;
  const home = <FontAwesomeIcon size="lg" icon={faHouse} />;

  const [showLinks, setShowLinks] = useState(false);
  const authCtx2 = useContext(AuthContext2);
  const isLoggedIn = authCtx2.isLoggedIn;
  const history = useHistory();

  return (
    <Navbar expand={false} fixed="top">
      <Container fluid>
        <Navbar.Brand href="/homepage">
          <img src={SecondBrandLogo} style={{ width: "60%" }} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        />

        <Navbar.Offcanvas
          className={classes.navbar}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src={NavbarLogo}
                style={{ width: "55%", marginLeft: "10px", marginTop: "10px" }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/homepage" className={classes.navbarLink}>
                <span className="mx-3">{home}</span>
                Home
              </Nav.Link>
              {!isLoggedIn && (
                <Nav.Link href="/employerlogin" className={classes.navbarLink}>
                  <span className="mx-3"> {user} </span> Login / Sign up
                </Nav.Link>
              )}
              <Nav.Link href="/onetimejobs" className={classes.navbarLink}>
                <span className="mx-3">{post}</span>Post an one time job
              </Nav.Link>
              <Nav.Link href="/parttimejobs" className={classes.navbarLink}>
                <span className="mx-3">{post}</span>Post a part time job
              </Nav.Link>
              <Nav.Link href="/payment" className={classes.navbarLink}>
                <span className="mx-3">{membership}</span>Subscription
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link href="/" className={classes.navbarLink}>
                <span className="mx-3">{employee}</span>Employee
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link
                  className={classes.navbarLink}
                  onClick={() => {
                    localStorage.removeItem("employerToken");
                    localStorage.removeItem("user_id");
                    authCtx2.logout();
                    history.push("/homepage");
                    alert("Successfully logged you out!");
                  }}
                >
                  <span className="mx-2"> {user} </span> Sign out
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default SecondNavbar;
