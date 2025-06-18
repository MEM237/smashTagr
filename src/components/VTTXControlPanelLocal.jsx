import React, { useEffect, useRef } from "react";
import { useApp } from "../AppContext";

export default function VTTXControlPanelLocal({ stream }) {
  const videoRef = useRef(null);
  const { state } = useApp();

  const cmid = state.halfSmash?.cmid || "loading...";
  const diit = state.halfSmash?.diit || "loading...";

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-full h-full bg-[#1a1a1a] rounded-[30px] shadow-md border border-orange-400 p-4 flex flex-col">
      <div className="text-white text-lg font-jura mb-2">Your Presence</div>

      <div className="w-full flex-grow bg-black border-2 border-gray-700 rounded-[20px] overflow-hidden">
        {stream ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">Awaiting camera...</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="text-yellow-400 text-sm">#{cmid}</div>
        
        <div className="w-8 h-8">
     {diit !== "loading..." ? (
        <img 
            src={diit} 
            alt="DIIT Symbol" 
            className="w-full h-full" 
        />
  ) : (
    <div className="text-xs text-gray-400">...</div>
  )}
</div>
        {/* --------------------- */}

      </div>
    </div>
  );
}