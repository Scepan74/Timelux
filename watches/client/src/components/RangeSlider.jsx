import React, { useState } from "react";
import "../css/RangeSlider.css";
import { useGlobalContext } from "./Context";

// slider component with two thumbs and a range display
const RangeSlider = () => {
  const { rangeValue, setRangeValue } = useGlobalContext();

  //handles the changes in the range slider left thumb
  const handleChange1 = (e) => {
    const newValue = [
      Math.min(parseInt(e.target.value), rangeValue[1] - 1),
      rangeValue[1],
    ];
    setRangeValue(newValue);
  };
  //handles the changes in the range slider right thumb
  const handleChange2 = (e) => {
    const newValue = [
      rangeValue[0],
      Math.max(parseInt(e.target.value), rangeValue[0] + 1),
    ];
    setRangeValue(newValue);
  };

  return (
    <div className="range-container">
      {/* displays the selected range of the slider */}
      <h5 className="range-display">
        ${rangeValue[0]}.00 - ${rangeValue[1]}.00
      </h5>
      <div className="inputs-container">
        <div className="slider-track"></div>
        {/* left thumb - range minimum */}
        <input
          className="range-input left"
          type="range"
          min={5000}
          max={1000000}
          step={10000}
          value={rangeValue[0]}
          onChange={handleChange1}
        />
        {/* right thumb - range maximum */}
        <input
          className="range-input right"
          type="range"
          min={5000}
          max={1000000}
          step={1000}
          value={rangeValue[1]}
          onChange={handleChange2}
        />
      </div>
    </div>
  );
};
export default RangeSlider;
