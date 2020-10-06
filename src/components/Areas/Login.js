import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { login } from "../../api";
import "./Login.css";
import Button from "./Button";

export default function Login({ customer, setCustomer }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    login({ username, password })
      .then((customer) => {
        localStorage.setItem("customer", JSON.stringify(customer));
        setCustomer(customer);
      })
      .catch((error) => {
        throw error;
      });
  };
  const usernameHandler = (event) => {
    setUsername(event.target.value); // updated
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value); // updated
  };
  return (
    <div className="login-container">
      <div className="login-wrap">
        <div className="Login">
          <h2 className="h2-create">Login</h2>
          <form onSubmit={submitHandler}>
            <FormGroup controlId="username">
              <FormLabel>Username</FormLabel>
              <FormControl
                className="un1"
                autoFocus
                type="text"
                value={username}
                onChange={usernameHandler}
              />
            </FormGroup>
            <FormGroup controlId="password" className="form-group2">
              <FormLabel>Password</FormLabel>
              <FormControl
                className="pass1"
                value={password}
                onChange={passwordHandler}
                type="password"
              />
            </FormGroup>
            <input className="submit" type="submit"></input>
          </form>
          <Button buttonStyle="btn--outline" to="/register">
            Register for an Account
          </Button>
        </div>
      </div>
    </div>
  );
}
