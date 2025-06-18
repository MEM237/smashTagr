// src/components/VTTX/VTTXControlPanelRemote.jsx
import React from "react";

export default function VTTXControlPanelRemote({ user }) {
  return (
    <div className="w-full h-full bg-[#1a1a1a] rounded-[30px] shadow-md border border-green-400 p-4 flex flex-col justify-start">
      <div className="text-white text-lg font-jura mb-2 flex-shrink-0 truncate">Their Presence</div>
      <div className="w-full h-[140px] bg-black border-2 border-gray-700 rounded-[20px] flex items-center justify-center overflow-hidden">
        {user?.videoStream ? (
          <video
            srcObject={user.videoStream}
            autoPlay
            muted
            className="w-full h-full object-cover rounded-[20px]"
          />
        ) : (
          <span className="text-gray-400">Connecting...</span>
        )}
      </div>
    </div>
  );
}
