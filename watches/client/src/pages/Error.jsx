import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      style={{
        height: "65vh",
        width: "100vw",
        border: "1px dotted transparent",
      }}
    >
      <h2
        style={{
          width: "100%",
          textAlign: "center",
          margin: "30% 50%",
          transform: "translateX( -50%)",
          fontSize: "3rem",
          fontWeight: "100",
        }}
      >
        Nooop, there's nothing here.
        <br />
        404
        <br />
        <span>
          <Link to="/" style={{ textDecoration: " underline" }}>
            Go Back
          </Link>
        </span>
      </h2>
    </div>
  );
};

export default Error;
