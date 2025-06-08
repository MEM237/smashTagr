// CommandBar.jsx
import React from "react";

// The component now accepts the reset handlers as props
export default function CommandBar({ lifeName, handleReset, handleDevHardReset }) {
  return (
    // MODIFIED: Added fixed positioning classes to lock the bar to the top of the screen
    // and increased height (h-16) for better spacing with the new buttons.
    <div className="fixed top-0 left-0 w-full h-10 bg-[#1a1a1a] text-gray-300 p-3 border-b-4 border-gray-700 font-jura uppercase text-sm flex items-center justify-between z-50">
      
      {/* The buttons are now contained in the left-aligned flex container */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-1 rounded shadow-md hover:bg-red-700 normal-case" // added normal-case
        >
          RESET
        </button>

        {/* Conditionally render the DEV button */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={handleDevHardReset}
            className="bg-purple-600 text-white px-4 py-1 rounded shadow-md hover:bg-purple-700 normal-case" // added normal-case
          >
            HARD RESET (DEV)
          </button>
        )}
      </div>

      {/* This existing centered text is preserved */}
      <div className="text-center w-full absolute left-0 right-0 pointer-events-none">
        {lifeName}
      </div>

      {/* This existing right-aligned icon is preserved */}
      <div className="flex items-center space-x-2 justify-end">
        <img src="/icons/uZen-icon.svg" alt="icon" className="w-7 h-7" />
      </div>
    </div>
  );
}