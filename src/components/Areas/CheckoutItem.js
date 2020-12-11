import React from "react";
import "./CheckoutItem.css";
import StarIcon from "@material-ui/icons/Star";
import Button from "./Button";

import { useStateValue } from "../StateProvider";

const CheckoutItem = ({ id, title, rating, price, image, setCart }) => {
  const [{ cart }, dispatch] = useStateValue();

  console.log(id, title, rating, price, image);

  const removeFromCart = () => {
    //removes movie from basket
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="checkoutItem">
      <img className="checkoutItem__image" src={image} alt="" />
      <div className="checkoutItem__info">
        <p className="checkoutItem__title">{title}</p>
        <p className="checkoutItem__price">
          <strong>{price}</strong>
        </p>
        <div className="checkoutItem__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="star__icon" />
            ))}
        </div>
        <button onClick={removeFromCart}>Remove from cart</button>
      </div>
    </div>
  );
};

export default CheckoutItem;
