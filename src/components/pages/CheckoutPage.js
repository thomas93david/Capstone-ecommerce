import React from "react";
import Checkout from "../Areas/Checkout";

const CheckoutPage = ({ customer, setCustomer }) => {
  return (
    <>
      <Checkout customer={customer} setCustomer={setCustomer} />
    </>
  );
};

export default CheckoutPage;
