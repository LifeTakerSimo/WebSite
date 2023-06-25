import React, { useState } from "react";
import { Text, Spacer } from "@nextui-org/react";

export const RuningGuy = () => {
  // Set initial state for horizontal and vertical positions
  const [horizontalPosition, setHorizontalPosition] = useState(0);
  const [verticalPosition, setVerticalPosition] = useState(0);

  // Handle mouse cursor movement
  const handleMouseMove = (event) => {
    // Calculate the new vertical position based on cursor position
    const newVerticalPosition = event.clientY;

    // Update the state with the new vertical position
    setVerticalPosition(newVerticalPosition);
  };

  return (
    <div className="footer" onMouseMove={handleMouseMove}>
      <div
        className="animation"
        style={{
          // Set the horizontal position based on the state value
          left: `${horizontalPosition}px`,
          // Set the vertical position based on the state value
          top: `${verticalPosition}px`,
        }}
      ></div>
    </div>
  );
};
