import React from "react";

export default function ModuleContainer({ x, y, w, h, isVisible, children }) {
  return (
    <div
      className="absolute" // Removed redundant transition classes
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(10px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}