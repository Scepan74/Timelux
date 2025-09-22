/*
 * A functional component that renders a carousel with navigation icons.
 * The carousel displays an infinite loop of slides and allows users to navigate through them.
 * The component uses React state and refs to manage the slide positions and transitions, so the animation is smooth and fluid. The last slide is followed by the first one, same as, going backwards, the first slide is followed by the last one.
 */
import React, { useEffect, useState, useRef } from "react";
import "../css/Carousel.css";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";

const Carousel = () => {
  //  setting array of slides as an initial state, referencing slides container,zeroing position and setting timeout.
  let sliderArray = [
    <Slide1 />,
    <Slide2 />,
    <Slide3 />,
    <Slide1 />,
    <Slide2 />,
    <Slide3 />,
  ];

  const [slides, setSlides] = useState(sliderArray);
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const containerRef = useRef([]);
  const position = 0;
  //----------------------------------------------------------------------
  /*
   * Navigates the carousel backwards
   *isTimeoutActive prevents event triggering while it is running to ensure a smooth animation.
   * It updates the slide positions and transitions, and then re-renders the carousel with the new slide order.
   */
  const backward = async () => {
    // Conditined by state of isTimeoutActive, asyncronously running the smooth animation uninterrupted. Timeout of equal time prevents event triggering while the function is concluded.
    if (isTimeoutActive) return;
    setIsTimeoutActive(true);
    await new Promise((resolve) => {
      containerRef.current.style.transform = `translate(${position + 100}%)`; // koja je razlika u poziciji?------------
      containerRef.current.style.transition = "all 2s ease";
      setTimeout(() => {
        resolve();
        setIsTimeoutActive(false);
      }, 2000);
    });

    //reset for next transition
    containerRef.current.style.transition = "none";
    containerRef.current.style.transform = "none";

    const lastSlide = slides.pop(); //  Get and remove the last item from the banners array
    const prevArray = [lastSlide, ...slides]; // Add the last item as the first item in newArray
    setSlides(prevArray); //Set the new Slides so the last comes first
  };

  const forward = async () => {
    //same as backward just reversed
    if (isTimeoutActive) return;

    setIsTimeoutActive(true);
    await new Promise((resolve) => {
      containerRef.current.style.transform = `translate(${position - 100}%)`;
      containerRef.current.style.transition = "all 2s ease";
      setTimeout(() => {
        resolve();
        setIsTimeoutActive(false);
      }, 2000);
    });

    containerRef.current.style.transition = "none";
    containerRef.current.style.transform = "none";

    const nextSlide = slides.shift(); // get and remove the first item from the banners array
    const nextArray = [...slides, nextSlide]; // Add the first item as the last item in newArray
    setSlides(nextArray);
  };
  //itaration of slides in container
  return (
    <div className="carousel">
      <div className="slider-window">
        <div className="slides-container" ref={containerRef}>
          {slides.map((slide, index) => (
            <React.Fragment key={index}>{slide}</React.Fragment>
          ))}
        </div>
        {/* carousel navigation buttons */}
        <div className="nav-icons">
          <div className="nav-icon" onClick={backward}>
            <PiArrowLeftThin />
          </div>
          <div className="nav-icon" onClick={forward}>
            <PiArrowRightThin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
