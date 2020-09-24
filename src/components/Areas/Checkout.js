import React, { useState } from "react";
import "./Checkout.css";
import StripeCheckout from "react-stripe-checkout"
import { toast } from "react-toastify";
import axios from "axios"
toast.configure()
const Checkout = () => {
  const [product] = useState({
    name: "diehard",
    price: 500.00
  })
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:3000/checkout/cart",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  return (
    <div className="checkout_container">
      <h1>CHECKOUT PAGE</h1>
      <div className="checkout_img_temp"></div>
      <div><StripeCheckout
        stripeKey="pk_test_51HV1w8L7qGrgZ4TMQtP4pgnfBIfkyECn7WlL9KnKoW7j4C1g566DKyYSk5jLIncZ4BB2y3V12khQxXbvx0s6isQj001TWD97Vq"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={100.00 * 100}
        name="movies"
      /></div>
    </div>
  );
};

export default Checkout;
