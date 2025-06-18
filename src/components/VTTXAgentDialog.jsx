// src/components/VTTX/VTTXAgentDialog.jsx

import React, { useRef, useEffect } from "react"; // 1. Import new hooks
import { useApp } from "../AppContext";

export default function VTTXAgentDialog() {
  const { state } = useApp();
  const { agentInterventions = [] } = state;
  const endOfMessagesRef = useRef(null); // 2. Create a ref to target the end of the list

  // 3. This effect runs when the list of interventions changes
  useEffect(() => {
    // It scrolls the target ref into view smoothly
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentInterventions]); // Dependency array ensures it runs on new messages

  return (
    <div className="w-full h-full bg-[#111] rounded-[30px] shadow-inner border border-pink-500 p-4 flex flex-col">
      <div className="flex-grow bg-[#222] rounded-[20px] p-2 space-y-2 overflow-y-auto"> {/* Main container for dialog content */}
        <div className="text-white text-lg font-jura mb-2">Agent Dialog</div> {/* Title */}
        {agentInterventions.length === 0 ? (
          <div className="text-gray-500 text-sm">No interventions yet.</div>
        ) : (
          agentInterventions.map((entry, index) => (
            <div
              key={index}
              className="bg-[#2a2a2a] text-white text-sm rounded-[15px] px-3 py-2 border-l-4 border-orange-300 shadow-sm"
            >
              <div className="font-semibold text-orange-400">{entry.name}</div>
              <div className="text-gray-300">{entry.message}</div>
              <div className="text-[10px] text-gray-500 mt-1">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {/* 4. Corrected ref attribute */}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
}