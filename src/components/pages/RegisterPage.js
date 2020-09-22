import React from "react";
import Register from "../Areas/Register";

const RegisterPage = ({ customer, setCustomer }) => {
  return (
    <>
      <Register customer={customer} setCustomer={setCustomer} />
    </>
  );
};

export default RegisterPage;
