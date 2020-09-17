import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            movieReelz <i class="fas fa-ticket-alt"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/movies"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/register"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
