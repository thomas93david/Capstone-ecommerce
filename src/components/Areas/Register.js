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
          <Form onSubmit={handleSubmit} className="register-wrap">
            <Form.Label className="create">Create Account</Form.Label>
            <Form.Group controlId="formUsername" className="form-groupR">
              <Form.Label></Form.Label>
              <Form.Control
                className="un"
                type="text"
                placeholder="Enter username"
                onChange={handleUser}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="form-groupR">
              <Form.Label></Form.Label>
              <Form.Control
                className="pass"
                type="password"
                placeholder="Enter password"
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group controlId="formRePassword" className="form-groupR">
              <Form.Label></Form.Label>
              <Form.Control
                className="pass"
                type="password"
                placeholder="Re-type password"
                onChange={handlePassword2}
              />
            </Form.Group>
            <div className="btn-fix">
              <input className="rsubmit" type="submit" href="/"></input>
            </div>
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
