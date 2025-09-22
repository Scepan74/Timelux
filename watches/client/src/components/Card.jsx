import React from "react";
import "../css/Card.css";

// card component that renders watch's img and deatails. Props received contains arguments with the watch data and a function to open the modal of the watch.
const Card = ({ watch, modal }) => {
  return (
    <div className="card" onClick={modal}>
      <img src={`${import.meta.env.VITE_API_URL}${watch.imageUrls[0]}`} alt="" />
      <div className="card-text">
        <h4>{watch.brand}</h4>
        <p>{watch.model}</p>
      </div>
      <p className="card-price">${watch.price}.00</p>
    </div>
  );
};

export default Card;
