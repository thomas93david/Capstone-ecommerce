import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
              <Form.Control type="email" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group controlId="formRePassword">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Re-type password" />
            </Form.Group>
            {
              <Button
                variant="primary"
                type="submit"
                href="/register"
                style={{
                  width: "250px",
                }}
              >
                Create movieReelz account
              </Button>
            }
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
