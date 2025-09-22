import React from "react";
import "../css/TestModeBadge.css";

import badge from "../assets/badgeGreen.png";

const TestModeBadge = ({ className: classPassed }) => {
  return (
    <img
      className={classPassed}
      src={badge}
      alt="badge"
      title="This website is in TEST MODE. No real transactions will be made."
    />
  );
};

export default TestModeBadge;
