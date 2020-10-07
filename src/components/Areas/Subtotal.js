import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { total } from "../reducer";
import Button from "./Button";

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();

  const cartEmptyHandler = (e) => {
    // e.preventDefault();
    localStorage.clear(".total__price");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>*Taxes included in price</p>
            <p>
              Subtotal ({cart.length} movies): <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={total(cart)}
        displayType={"text"}
        thousandSeparator={false}
        prefix={"$"}
      />

      <Button
        buttonStyle="btn--outline"
        to="/CheckoutSuccess"
        onClick={cartEmptyHandler}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default Subtotal;
