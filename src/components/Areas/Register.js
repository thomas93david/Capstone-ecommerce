import React from "react";
import { Form } from "react-bootstrap";

import { register } from "../../api";
// import { Redirect } from "react-router-dom"
import "./Register.css";
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");

const Register = ({ customer, setCustomer }) => {
  // TODO Use State
  let username;
  let password1;
  let password2;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("this is the username...", username);
    console.log("this is the password1...", password1);
    console.log("this is the password2...", password2);

    if (password1 === password2) {
      register({ username, password: password1 }).then((newCustomer) => {
        console.log("New User", newCustomer);
        setCustomer(newCustomer);
      });
    }
  };

  const handleUser = (event) => {
    username = event.target.value;
  };
  const handlePassword = (event) => {
    password1 = event.target.value;
  };
  const handlePassword2 = (event) => {
    password2 = event.target.value;
  };

  return (
    <>
      <div className="register-container">
        <div className="register-cnt">
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "pink",
              width: "500px",
              height: "275px",
              textAlign: "center",
            }}
          >
            <Form.Label
              style={{
                textAlign: "center",
                fontSize: "24px",
                padding: "20px",
              }}
            >
              Create Account
            </Form.Label>
            <Form.Group controlId="formUsername">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={handleUser}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group controlId="formRePassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-type password"
                onChange={handlePassword2}
              />
            </Form.Group>
            <input className="register-btn" type="submit"></input>
          </Form>
          <div className="register-logo">
            <i className="fas fa-theater-masks"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
