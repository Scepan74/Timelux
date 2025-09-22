import React, { useEffect, useRef, useState } from "react";
import "../css/Validation.css";
import { useGlobalContext } from "./Context";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

//Component validates user email and password, and save the data in the local storage when it's the first time signing up. If the user has already signed up, it validates the input with the data in the local storage and navigates to the account page if the input is correct. If the input is incorrect, it shows an error message.

const Validation = ({ title }) => {
  const {
    center,
    checkinRef,
    toggleShowPass,
    isSignedup,
    setIsSignedup,
    showPass,
  } = useGlobalContext();

  // setting initial state values from localStorage data
  const emailLocal = localStorage.getItem("emailData");
  const passwordLocal = localStorage.getItem("passwordData");
  const [email, setEmail] = useState(emailLocal);
  const [password, setPassword] = useState(passwordLocal);

  // useNavigate hook to navigate to the account page
  const navigate = useNavigate();

  //icon props for the eye icon to avoid repetition
  const iconProps = {
    onClick: toggleShowPass,
    style: { marginLeft: "1rem" },
  };

  //  Checks if the input is correct and navigates to the account page, or if the input is incorrect, it shows an error message.
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // checks for first time user - no localStorage data, and signe them up
    if (!emailLocal && !passwordLocal) {
      // no signup yet
      localStorage.setItem("emailData", email);
      localStorage.setItem("passwordData", password);
      setEmail(emailLocal);
      setPassword(passwordLocal);
      navigate("/account");
      // if user has already signed up, checks if the input is correct
    } else {
      if (emailLocal === email && passwordLocal === password) {
        // all correct-go to account
        navigate("/account");
      } else {
        if (emailLocal !== email && passwordLocal !== password) {
          // Both email and password are incorrect- render error msg
          checkinRef.current.children[1].querySelector(
            ".email-msg"
          ).style.visibility = "visible";
          checkinRef.current.children[1].querySelector(
            ".pass-msg"
          ).style.visibility = "visible";
        } else if (emailLocal !== email) {
          //  email is incorrect-error msg
          checkinRef.current.children[1].querySelector(
            ".email-msg"
          ).style.visibility = "visible";
        } else if (passwordLocal !== password) {
          // password is incorrect-error msg
          checkinRef.current.children[1].querySelector(
            ".pass-msg"
          ).style.visibility = "visible";
        }
      }
    }
  };

  return (
    <div //animating login form to center
      className="signup login-container"
      onClick={() => center()}
    >
      {/* signup form */}
      <h1 className="signup-title">{title}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="asd@f.com"
            autoFocus
          />
          {/* ivisible error msg */}
          <span className="msg email-msg">Invalid email</span>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div>
            {/* toggle password input visibility */}
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              // placholder for convinience of portfolio user
              placeholder="asdf"
            />
            {showPass ? (
              <AiOutlineEyeInvisible {...iconProps} />
            ) : (
              <AiOutlineEye {...iconProps} />
            )}
          </div>
          {/* ivisible error msg */}
          <span className="msg pass-msg">Incorrect password</span>
        </div>
        {/* submit button titled up to checkin status - signup/login */}
        <button type="submit" className="login-btn">
          {title}
        </button>
      </form>
    </div>
  );
};

export default Validation;
