import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { login } from "../../api"
import Button from "./Button";
import "./Login.css";

export default function Login({ customer, setCustomer }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    login({ username, password }).then((customer) => {
      localStorage.setItem('customer', JSON.stringify(customer));
      setCustomer(customer);
    }).catch((error) => { throw error });
  }
  const usernameHandler = (event) => {
    setUsername(event.target.value); // updated
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value); // updated
  }

  return (
    <div className="login-container">
      <div className="login-wrap">
        <div className="Login">
          <h2>Login</h2>
          <form onSubmit={submitHandler}>
            <FormGroup controlId="username">
              <FormLabel>Username</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={username}
                onChange={usernameHandler}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={password}
                onChange={passwordHandler}
                type="password"
              />
            </FormGroup>
            <input type="submit">
            </input>
          </form>
        </div>
      </div>
    </div>
  );
}
