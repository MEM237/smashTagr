import React from "react";
import { useApp } from "../AppContext";
import agentIconMap from "../utils/agentIconMap";
import { dialogScripts } from "../utils/dialogScripts";

export default function VTTXReflexGrid({ users = {}, onTileClick }) {
  const { dispatch } = useApp();
  const seenPairs = new Set();
  const grid = Array.from({ length: 12 }); // 3x4 grid (rows × columns)

  const handleTileClick = (tile, id) => {
    if (!tile || !tile.type) return;

    if (tile.type === "agent") {
      const cmid = tile.cmid;
      const agentData = agentIconMap[cmid];
      const script = (dialogScripts[cmid] || ["..."])[0];

      if (agentData) {
        dispatch({
          type: "AGENT_INTERVENTION",
          payload: {
            cmid,
            name: agentData.name,
            message: script,
            timestamp: Date.now(),
          },
        });

        dispatch({
          type: "ADD_LOG",
          payload: `${cmid}: ${script}`,
        });
      }

      // Timed follow-up response from agent
setTimeout(() => {
  dispatch({
    type: "AGENT_INTERVENTION",
    payload: {
      cmid,
      name: agentData.name,
      message: "Agent has logged your presence.",
      timestamp: Date.now(),
    },
  });

  dispatch({
    type: "ADD_LOG",
    payload: `${cmid}: Agent has logged your presence.`,
  });
}, 1200);

      fetch("/api/bridge/agent-bridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmid, agent: tile.agent }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Agent reply:", data);
          dispatch({
            type: "ADD_LOG",
            payload: `${data.agent}: ${data.message || "response received"}`,
          });
        })
        .catch(err => {
          console.error("Bridge error", err);
        });
    }

    if (onTileClick) onTileClick(id);
  };

  return (
    <div className="w-full h-full bg-[#111] rounded-[20px] p-2 shadow-lg flex items-center justify-center">
      <div className="flex-grow overflow-y-auto grid grid-cols-3 gap-2 rounded-[20px] bg-[#222] p-2">
        {grid.map((_, i) => {
          const id = `${Math.floor(i / 3)}-${i % 3}`;
          const tile = users[id] || {};
          const cmid = tile.cmid || id;
          const diit = tile.diit || "";

          const identityKey = `${cmid}::${diit}`;
          const isDuplicate = cmid && diit && seenPairs.has(identityKey);
          if (!isDuplicate && cmid && diit) seenPairs.add(identityKey);

          const isAgent = tile.type === "agent";
          const agent = isAgent ? agentIconMap[cmid] : null;

          return (
            <div
              key={id}
              onClick={() => !isDuplicate && handleTileClick(tile, id)}
              title={isAgent ? `${agent?.name}: ${agent?.role}` : `User Tile ${id}`}
              className={`relative bg-[#222] border rounded-lg flex items-center justify-center transition-all duration-300 group ${
                isDuplicate
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer hover:shadow-md hover:scale-[1.05]"
              } ${
                isAgent && !isDuplicate ? "border-orange-400" : "border-gray-600"
              }`}
            >
              {isAgent && agent?.icon ? (
                <img
                  src={agent.icon}
                  alt={agent.name}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400 break-all px-1">
                  {cmid}
                </span>
              )}
              {isDuplicate && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-red-500 font-bold text-xs">
                  DUPE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
