import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

import Button from "./Areas/Button";
import "./Header.css";

const Header = ({ customer, setCustomer }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const signOutHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem('customer');
    setCustomer({});
  }

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo">
            movieReelz <i className="fas fa-theater-masks"></i>
            Welcome, {customer.username}
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/movies"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/checkout"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-cart-plus"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
          <Form.Group>
            <Form.Control
              className="nav-search"
              size="sm"
              type="text"
              placeholder="search movies"
            />
          </Form.Group>
          {customer.token ?
            <>
              {button && (
                <Button onClick={signOutHandler} buttonStyle="btn--outline" to="/" type="submit">
                  LOGOUT
                </Button>
              )}
            </>
            : <>
              {button && (
                <Button buttonStyle="btn--outline" to="/register">
                  SIGN UP
                </Button>
              )}
              {button && (
                <Button buttonStyle="btn--outline" to="/login">
                  LOGIN
                </Button>
              )}
            </>
          }

        </div>
      </nav>
    </>
  );
};

export default Header;
