import React, { useState } from "react";
import "../css/Modal.css";
import { PiHandbagThin } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";
import { useGlobalContext } from "./Context";
import { Link } from "react-router-dom";

// Modal component displaying a watch item
const Modal = () => {
  const { isOpen, setIsOpen, watch, addToCart } = useGlobalContext();
  const [mainImgIndex, setMainImgIndex] = useState(0);

  // making sure watch was provided
  if (!watch) {
    return null;
  }

  return (
    // adding class to modal container toggling open and close
    <div className={isOpen ? "modal" : "closed"}>
      {/* modal close btn */}
      <TfiClose className="close-modal-btn" onClick={() => setIsOpen(false)} />
      {/* Watch images box */}
      <div className="modal-box modal-img-box">
        {/* Main watch image set by mainImgIndex that is initially set to 0*/}
        <div className="main-img">
          <img src={`${import.meta.env.VITE_API_URL}${watch.imageUrls[mainImgIndex]}`} />
        </div>
        {/* Additional watch images. Loop through watch image urls and display them */}
        <div className="add-img-box">
          {watch.imageUrls.map((url, index) => (
            <img
              key={index}
              // setting class name to style main image as selected amongst additional images
              className={
                mainImgIndex === index ? "selected add-img" : "add-img"
              }
              src={`${import.meta.env.VITE_API_URL}${url}`}
              alt=""
              // setting mainImgIndex to the index of the clicked image to display it as selected
              onClick={() => {
                setMainImgIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      {/* Watch description box */}
      <div className="modal-box modal-text-box">
        <p>{watch.description}</p>
      </div>

      {/* Watch details box */}
      <div className="modal-box modal-cart-box">
        {/*  name and model */}
        <h2>{watch.brand}</h2>
        <h3>{watch.model} </h3>

        {/*  categories */}
        <p style={{ textTransform: "uppercase", color: "red" }}>
          {watch.categories.map((category, index) => (
            <span key={index}>{category} ! ! !</span>
          ))}
        </p>

        {/* gender */}
        <p>Gender: {watch.gender}</p>

        {/* styles */}
        <p>
          Style:
          {watch.styles.map((style, index) => (
            <span key={index}> {style}, </span>
          ))}
        </p>

        {/* materials */}
        <p>
          Materials:
          {watch.materials.map((material, index) => (
            <span key={index}> {material}, </span>
          ))}
        </p>

        {/*  movement */}
        <p>Movement: {watch.movement}</p>

        {/*  price */}
        <p className="modal-price">${watch.price}.00</p>

        {/* Add to cart button */}
        <Link to="/cart">
          <button
            type="button"
            className="btn modal-btn"
            onClick={() => addToCart(watch)}
          >
            <PiHandbagThin className="btn-icon" />
            Add to cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
