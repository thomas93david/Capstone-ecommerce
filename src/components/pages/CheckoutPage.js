import React from "react";
import Checkout from "../Areas/Checkout";

const CheckoutPage = ({ cart, customer, setCustomer }) => {
  return (
    <>
      <Checkout cart={cart} customer={customer} setCustomer={setCustomer} />
    </>
  );
};

export default CheckoutPage;
