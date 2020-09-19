import React from "react";
import "./Login.css";
import { Button } from "react-bootstrap";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-wrap">
        <h3>
          Sign-in
          <span>
            <i className="fas fa-user-circle" />
          </span>
        </h3>

        <form className="login" id="login">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            id="login-username"
            required
          />
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            id="login-password"
            required
          />
          {
            <Button
              variant="primary"
              type="submit"
              style={{
                width: "250px",
              }}
            >
              Login
            </Button>
          }
          {
            <Button
              variant="primary"
              type="submit"
              style={{
                width: "250px",
              }}
            >
              Logout{" "}
            </Button>
          }
        </form>
      </div>
    </div>
  );
};

export default Login;
