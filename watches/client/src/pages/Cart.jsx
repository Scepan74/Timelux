import React, { useState } from "react";
import "../css/Cart.css";
import CartItem from "../components/CartItem";
import { PiHandbagThin } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useGlobalContext } from "../components/Context";
import { Link } from "react-router-dom";

// component renders a shopping cart. It also renders a message if there are no items in the cart.
const Cart = () => {
  const { cart, clearCart, total } = useGlobalContext();

  //If there are no items in the cart, render a message.
  if (cart.length === 0) {
    return (
      <main>
        {/* blue whale background animation */}
        <section className="cart wrapper">
          <div className="gradient">
            <div className="frame"></div>
          </div>
          <header className="cart-header">
            <PiHandbagThin className="cart-icon" />
            <h2>currently empty</h2>
            <div className="go-back">
              <Link to="/all">
                <h2>back to watches</h2>
                <div className="back-arrows">
                  <IoIosArrowBack />
                  <IoIosArrowBack style={{ color: "red" }} />
                  <IoIosArrowBack />
                </div>
              </Link>
            </div>
          </header>
        </section>
      </main>
    );
  }

  // If cart not empty, render items with the cart total.

  return (
    <main>
      <section className="cart wrapper">
        <div className="gradient">
          <div className="frame"></div>
        </div>
        <header className="cart-header">
          <PiHandbagThin className="cart-icon" />
          <div className="go-back">
            <Link to="/all">
              <h2>back for more</h2>
              <div className="back-arrows">
                <IoIosArrowBack />
                <IoIosArrowBack style={{ color: "red" }} />
                <IoIosArrowBack />
              </div>
            </Link>
          </div>
        </header>

        <div className="cart-container">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-footer">
          {/* clear cart btn - cancel purchase */}
          <button className=" clear-btn btn" onClick={clearCart}>
            clear cart
          </button>
          <hr style={{ width: "70%", margin: "auto" }} />

          <div className="cart-total">
            <h4>
              total:
              <span>${total}.00</span>
            </h4>
          </div>

          {/* buy btn - redirect to checkin page */}
          <Link to="/checkin">
            <button className=" buy-btn btn">Buy</button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Cart;
