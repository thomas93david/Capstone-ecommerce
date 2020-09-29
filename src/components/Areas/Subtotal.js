import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <p>Below will be subtotal</p>
      <CurrencyFormat
      renderText={(value) => (
        <>
          <p>
            Subtotal ({cart.length} movies): <strong>{`${value}`}</strong>
          </p>
        </>
      )}
      decimalScale={2}
      value={0}
      displayText={"text"}
      thousandSeparator={true}
      prefix={"$"}
      />
    </div>
  );
}

export default Subtotal;
