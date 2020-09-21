import React, { useState } from "react";
import {
  NavLink,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login-container">
      <div className="login-wrap">
        <div className="Login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="username">
              <FormLabel>Username</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <NavLink>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
