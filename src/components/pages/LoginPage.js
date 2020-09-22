import React from "react";
import Login from "../Areas/Login";

const LoginPage = ({ customer, setCustomer }) => {
  return (
    <>
      <Login customer={customer} setCustomer={setCustomer} />
    </>
  );
};

export default LoginPage;
