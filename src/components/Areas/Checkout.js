import React, { useState } from "react";
import "./Checkout.css";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { useStateValue } from "../StateProvider";
import CheckoutItem from "./CheckoutItem";
import Subtotal from "./Subtotal";

import axios from "axios";
// import { createCart } from "../../api";

toast.configure();

const Checkout = () => {

  const [{ cart }] = useStateValue();

  const [product] = useState({
    name: "diehard",
    price: 500.0,
  });

  async function handleToken(token, addresses) {
    const response = await axios.post("http://localhost:3000/checkout/cart", {
      token,
      cart,
    });

    const { status } = response.data;

    console.log("Response:", response.data);

    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="checkout__container">
      <div className="checkout__leftside">
        <div className="cart-container">

          {cart?.length === 0 ? (
            <div className="checkout__header__empty">
              <h2> Your Shopping Cart is empty</h2>
              <p>You have no movies in your cart</p>
              <p> To buy a movie, click "Add to cart" next to the movie</p>
              <img
                className="checkout__empty__image"
                src="https://images5.alphacoders.com/481/thumb-1920-481903.png"
              ></img>
            </div>
          ) : (
            <div className="checkout__header__movies">
              <h2> Your Shopping Cart</h2>

              {cart.map((movie) => {
                console.log(movie);
                return (
                  <CheckoutItem
                    id={movie.id}
                    movie={movie.id}
                    title={movie.title}
                    image={movie.image}
                    price={movie.price}
                    rating={movie.rating}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="checkout__rightside">
          <Subtotal />
          {/* <div className="payment">
            <StripeCheckout
              stripeKey="pk_test_51HV1w8L7qGrgZ4TMQtP4pgnfBIfkyECn7WlL9KnKoW7j4C1g566DKyYSk5jLIncZ4BB2y3V12khQxXbvx0s6isQj001TWD97Vq"
              token={handleToken}
              billingAddress
              shippingAddress
              amount={100.0 * 100}
              name="Movies"
            />
          </div> */}
        </div>
      )}

    </div>
  );
};

export default Checkout;
