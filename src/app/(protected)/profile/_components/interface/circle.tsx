"use client"

import React, { useState } from "react";

const Circle = () => {
  const [angle, setAngle] = useState(0);

  const handleClick = () => {
    setAngle((prevAngle) => prevAngle + 90);
  };

  return (
    <div className="absolute">
      <button onClick={handleClick}>Rotate</button>
			<canvas className="bg-red-300 w-10 h-10"></canvas>
    </div>
  );
};

export default Circle;