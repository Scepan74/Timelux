import React, { useState } from "react";
import "../css/SimpleSlider.css";

const SimpleSlider = () => {
  const [rangeValue, setRangeValue] = useState([0, 100]);

  // const handleChange1 = (e) => {
  //   setRangeValue((prevRangeValue) => [
  //     Math.min(parseInt(e.target.value), prevRangeValue[1]),
  //     prevRangeValue[1],
  //   ]);
  // };

  // const handleChange2 = (e) => {
  //   setRangeValue((prevRangeValue) => [
  //     prevRangeValue[0],
  //     Math.max(parseInt(e.target.value), prevRangeValue[0]),
  //   ]);
  // };

  const handleChange1 = (e) => {
    const newValue = [
      Math.min(parseInt(e.target.value), rangeValue[1] - 1),
      rangeValue[1],
    ];
    setRangeValue(newValue);
  };

  const handleChange2 = (e) => {
    const newValue = [
      rangeValue[0],
      Math.max(parseInt(e.target.value), rangeValue[0] + 1),
    ];
    setRangeValue(newValue);
  };

  return (
    <div className="range-container">
      <h5 className="range-display">
        {rangeValue[0]}-{rangeValue[1]}
      </h5>
      <div className="inputs">
        <div className="slider-track"></div>
        <input
          type="range"
          min={0}
          max={100}
          value={rangeValue[0]}
          onChange={handleChange1}
          className="range-input"
        />
        <input
          type="range"
          min={0}
          max={100}
          value={rangeValue[1]}
          onChange={handleChange2}
          className="range-input second"
        />
      </div>
    </div>
  );
};

export default SimpleSlider;
