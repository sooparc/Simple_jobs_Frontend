import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHouse } from "@fortawesome/free-solid-svg-icons";

const MainFooter = () => {
  const contact = <FontAwesomeIcon size="lg" icon={faAddressCard} />;
  const house = <FontAwesomeIcon size="lg" icon={faHouse} />;

  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-muted">
            &copy; 2022 PART TIME JOBS FINDER
          </p>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-muted">
                {house}
              </a>
            </li>
            <li className="nav-item">
              <a href="/profile" className="nav-link px-2 text-muted">
                {contact}
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default MainFooter;
