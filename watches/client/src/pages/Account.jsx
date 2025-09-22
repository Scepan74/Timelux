import React from "react";
import "../css/Account.css";
import { useGlobalContext } from "../components/Context";
import { loadStripe } from "@stripe/stripe-js";

//Account component renders a list of the items in the cart, the total price, and a button to checkout with Stripe.
const Account = () => {
  const { cart, total } = useGlobalContext();

  //checkOut function asynchronously sends a POST request to the /orders endpoint with the cart items.It then redirects the user to the Stripe checkout page.
  const checkOut = async () => {
    try {
      // loading stripe
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);
      //request to the API including the API url, method, headers with the API token and body with the cart items
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/orders", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_API_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });
      const responseData = await res.json();
      console.log(responseData.stripeSession.id);
      // redirecting to the Stripe checkout page passing the session id
      await stripe.redirectToCheckout({
        sessionId: responseData.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <section className="pay-cart wrapper">
        <div className="gradient">
          <div className="frame"></div>
        </div>
        <header className="account-header">
          <div>
            <h2>This is your purchase:</h2>
          </div>
        </header>
        {/* renders the items in the cart */}
        <div className="pay-container">
          {cart.map((item) => (
            <article className="pay-item" key={item.id}>
              <h4>{item.brand}</h4>
              <img src={`${import.meta.env.VITE_API_URL}${item.imageUrls[0]}`} />
              <div>
                <h4 className="item-price">
                  {item.amount === 1
                    ? `$${item.price}.00`
                    : `${item.amount} x $${item.price}.00 `}
                </h4>
              </div>
            </article>
          ))}
        </div>
        <div className="pay-cart-footer">
          <hr style={{ width: "70%", margin: "auto" }} />
          <div className="cart-total">
            <h4>
              total:
              <span>${total}.00</span>
            </h4>
          </div>
          {/* button to checkout with Stripe */}
          <button className=" pay-btn btn" onClick={checkOut}>
            Pay
          </button>
        </div>
      </section>
    </main>
  );
};

export default Account;
