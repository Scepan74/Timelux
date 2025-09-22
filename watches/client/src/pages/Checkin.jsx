import React, { useEffect, useRef } from "react";
import "../css/Checkin.css";
import Validation from "../components/Validation";
import { useGlobalContext } from "../components/Context";

// Checkin page renders a form for user signup or login. It contains Validation component based on localStorege data for first time users or returners.
const Checkin = () => {
  const { checkinRef } = useGlobalContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      {/* blue whale background animation */}
      <section className="checkin wrapper">
        <div className="gradient">
          <div className="frame"></div>
        </div>
        <div className="heading">
          <h1>Please Check in </h1>
        </div>
        {/* checkin form styled in css to render diferentlly depending on screen size */}
        <div className="checkin-form" ref={checkinRef}>
          <dir id="signup">
            <Validation title="Signup" />
          </dir>
          <dir id="login">
            <Validation title="Login" />
          </dir>
          <dir id="checkin-single">
            <Validation title="Check in" />
          </dir>
        </div>
      </section>
    </main>
  );
};
export default Checkin;
