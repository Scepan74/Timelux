import React from "react";
import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";

//component renders a slide with 3 images, a title and a link. From the Context it accesses the "banner" state, containing the sources of the images.

const Slide1 = () => {
  const { banner } = useGlobalContext();

  return (
    <div className={`slide slide1`}>
      {/* these are the images to be displayed in the carousel */}
      <img src={banner[0]} className="banner-img1" loading="lazy" />
      <img src={banner[1]} className="banner-img2" loading="lazy" />
      <img src={banner[2]} className="banner-img3" loading="lazy" />

      {/* title and link to the "Limited" collection. Used state:source prop to pass the source of the collection  */}

      <div className="slide-title title1">
        <h1>Limited</h1>
        <Link to="/collections" state={{ source: "Limited" }}>
          <span className="btn btn1">collection</span>
        </Link>
      </div>
    </div>
  );
};

export default Slide1;
