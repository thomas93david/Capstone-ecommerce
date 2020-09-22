import React from "react";
import { Form } from "react-bootstrap";
import Button from "./Button";

import "./Register.css";

const Register = () => {
  return (
    <>
      <div className="register-container">
        <div className="register-cnt">
          <Form
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
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group controlId="formRePassword">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Re-type password" />
            </Form.Group>

            <Button buttonStyle="btn--primary" to="/">
              SIGN UP
            </Button>
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
