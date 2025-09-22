import React from "react";
import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";
//component renders a slide with 3 images, a title and a link. From the Context it accesses the "banner" state, containing the sources of the images.

const Slide3 = () => {
  const { banner } = useGlobalContext();
  return (
    <div className={`slide slide3`}>
      {/* these are the images to be displayed in the carousel */}
      <img src={banner[2]} className="banner-img3" loading="lazy" />
      <img src={banner[3]} className="banner-img5" loading="lazy" />
      <img src={banner[6]} className="banner-img6" loading="lazy" />
      <img src={banner[0]} className="banner-img1" loading="lazy" />
      {/* title and link to the "New" collection. Used state:source prop to pass the source of the collection  */}
      <div className="slide-title title3">
        <h1>Fresh</h1>
        <Link to="/collections" state={{ source: "New" }}>
          <span className="btn btn3">collection</span>
        </Link>
      </div>
    </div>
  );
};

export default Slide3;
