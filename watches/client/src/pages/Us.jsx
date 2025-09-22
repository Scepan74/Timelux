import React from "react";
import usImg1 from "../assets/Usimg.jpg";
import usImg2 from "../assets/old.webp";
import "../css/Us.css";

const Us = () => {
  return (
    <main>
      <section className="us section wrapper">
        {/* <div className="gradient">
          <div className="frame"></div>
        </div> */}
        <div className="img1-container">
          <img src={usImg2} alt="" />
        </div>
        <div className="brand-text">
          <p>
            All about<span>TimeLux</span> Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Magni aliquam sunt animi aspernatur
            excepturi, rerum similique repellendus deleniti perferendis
            doloremque ut ratione libero porro eligendi reprehenderit tempora
            placeat. Est quas quidem cumque beatae provident id dolore sint
            quibusdam quos suscipit.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            architecto adipisci aut ex harum repudiandae nemo voluptatem
            suscipit quos optio molestiae voluptate perspiciatis voluptates
            ipsam, labore sequi. Quidem minima consequatur vitae placeat
            assumenda iure ea. Quos fugit sapiente fugiat dolorum aperiam
            laboriosam magni hic possimus, placeat rem ut eveniet maxime
            delectus suscipit, necessitatibus ipsum beatae. Fugit quis maxime
            unde ipsa?
          </p>
        </div>
        <div className="img2-container">
          <img src={usImg1} alt="" />
        </div>
      </section>
    </main>
  );
};

export default Us;
