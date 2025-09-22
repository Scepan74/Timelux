import React, { useEffect, useState } from "react";
import "../css/CartItem.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useGlobalContext } from "./Context";
import { TfiClose } from "react-icons/tfi";

// component displays a single cart item of the cart

const CartItem = ({ item }) => {
  const { remove, toggleAmount } = useGlobalContext();

  const subTotal = item.amount * item.price;
  return (
    // renders item's details and remove button and amount buttons
    <article className="cart-item">
      <img src={`${import.meta.env.VITE_API_URL}${item.imageUrls[0]}`} />
      <div className="item-info">
        {/* small screen remove button */}
        <button
          className="cart-item-remove"
          onClick={() => remove(item.id)}
          title="Remove item from cart"
        >
          <TfiClose />
        </button>
        <h4>{item.brand}</h4>
        <h5>{item.model}</h5>
        <h4 className="item-price">
          {item.amount} x $ {item.price}.00
        </h4>

        {/* large screen remove button */}
        <button className="remove-btn btn" onClick={() => remove(item.id)}>
          remove
        </button>
      </div>
      <div className="amount">
        {/* amount + */}
        <button
          className="amount-btn"
          onClick={() => toggleAmount(item.id, "inc")}
          title="Increase item amount"
        >
          <IoIosArrowUp />
        </button>

        <p className="amount">{item.amount}</p>
        {/* amount - */}
        <button
          className="amount-btn"
          onClick={() => toggleAmount(item.id, "dec")}
          title="Decrease item amount"
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div className="subtotal">
        Subtotal: $ {subTotal}
        .00
      </div>
    </article>
  );
};

export default CartItem;
