// src/components/VTTXAlert.jsx
import React from "react";

const VTTXAlert = ({ onAccept, onDecline, cmid = "Cranjis McBasketball" }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-50 flex items-center justify-center font-jura">
      <div className="bg-gray-950 p-6 rounded-2xl border border-yellow-500 w-[600px] flex flex-col items-center space-y-6 shadow-xl">

        {/* Cam Feed Preview */}
        <div className="w-[225px] h-[150px] bg-yellow-600 rounded-[15px] flex items-center justify-center text-black font-bold text-xl">
          cam feed
        </div>

        {/* Message Preview */}
        <div className="text-white text-xl text-center lowercase">
          {cmid} is offering you presence.
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between w-full px-6">
          <button
            onClick={onDecline}
            className="w-[150px] h-[80px] bg-red-700 text-white rounded-xl text-lg hover:bg-red-800 transition"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="w-[150px] h-[155px] bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default VTTXAlert;
