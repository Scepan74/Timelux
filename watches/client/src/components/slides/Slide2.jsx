import React from "react";
import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";

/* React functional component that renders a slide with 3 images, a title and a link. From the Context it accesses the "banner" state, containing the sources of the images.
 */
const Slide2 = () => {
  const { banner } = useGlobalContext();
  return (
    <div className={`slide slide2`}>
      {/* these are the images to be displayed in the carousel */}
      <img src={banner[1]} className="banner-img2" />
      <img src={banner[5]} className="banner-img4" />
      <img src={banner[3]} className="banner-img5" />

      {/* title and link to the "Best Seller" collection. Used state:source prop to pass the source of the collection  */}
      <div className="slide-title title2">
        <h1>Best Sellers</h1>
        <Link to="/collections" state={{ source: "Best Seller" }}>
          <span className="btn btn2">collection</span>
        </Link>
      </div>
    </div>
  );
};

export default Slide2;
