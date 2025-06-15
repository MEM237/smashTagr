import React, { useEffect, useState } from "react";
import ModuleContainer from "./ModuleContainer";
import VTTXControlPanelLocal from "./VTTXControlPanelLocal";
import VTTXControlPanelRemote from "./VTTXControlPanelRemote";
import VTTXReflexGrid from "./VTTXReflexGrid";
import VTTXAgentDialog from "./VTTXAgentDialog";
import VTTXTextInput from "./VTTXTextInput";
import VTTXAlert from "./VTTXAlert";
import { useApp } from "../AppContext";
import { useCam } from "../context/CamContext";
import { mockUsers } from "../utils/mockUsers";

export default function VTTXWindow() {
  const { state: appState, dispatch } = useApp();
  const { stream, startCam, error: camError } = useCam();
  const [visibleModules, setVisibleModules] = useState([]);

  // --- Logic for Camera and Interactivity ---
  useEffect(() => {
    if (!stream && !camError) {
      startCam().catch(err => {
        dispatch({ type: 'ADD_LOG', payload: `❌ Camera access denied in VTTXWindow` });
      });
    }
  }, [stream, startCam, camError, dispatch]);

  const handleTileClick = (id) => {
    const tile = mockUsers[id];
    if (!tile) return;
    dispatch({ type: 'SET_TARGET_USER', payload: { ...tile, id } });
  };

  const handleSend = (msg) => {
    dispatch({ type: 'ADD_LOG', payload: `🗣️ You: ${msg}` });
  };

  // --- Layout and Component Configuration ---
  const moduleLayouts = {
    local: { x: 728, y: 93, w: 460, h: 240 },
    remote: { x: 260, y: 93, w: 460, h: 240 },
    grid: { x: 828, y: 346, w: 360, h: 540 },
    dialog: { x: 260, y: 353, w: 375, h: 250 },
    input: { x: 260, y: 618, w: 550, h: 270 },
  };

  const components = {
    local: () => <VTTXControlPanelLocal stream={stream} />,
    remote: () => appState.targetUser ? <VTTXControlPanelRemote cmid={appState.targetUser.cmid} /> : null,
    grid: () => <VTTXReflexGrid users={mockUsers} onTileClick={handleTileClick} />,
    dialog: () => <VTTXAgentDialog logs={appState.logs} />,
    input: () => <VTTXTextInput onSend={handleSend} />,
  };

  // --- Effects for Animations and Alerts ---
  useEffect(() => {
    const moduleKeys = Object.keys(moduleLayouts).filter(key => key !== "remote");
    moduleKeys.forEach((key, index) => {
      setTimeout(() => {
        setVisibleModules(prev => [...prev, key]);
      }, index * 200);
    });
  }, []);

  useEffect(() => {
    if (appState.targetUser && !visibleModules.includes("remote")) {
      const timer = setTimeout(() => {
        setVisibleModules(prev => [...prev, "remote"]);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [appState.targetUser, visibleModules]);

  useEffect(() => {
    if (appState.targetUser) {
      const timer = setTimeout(() => dispatch({ type: 'SHOW_ALERT' }), 1000);
      return () => clearTimeout(timer);
    }
  }, [appState.targetUser, dispatch]);

  return (
    // This new outer div centers its child in the viewport
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      
      {/* This is the original canvas, now being centered by the parent div. */}
      {/* Its 'relative' positioning is still required for the modules inside. */}
      <div className="relative w-[1445px] h-[980px]">
        {Object.entries(moduleLayouts).map(([key, { x, y, w, h }]) => {
          const isAnimatedIn = visibleModules.includes(key);
          const shouldShow = key === "remote" ? !!appState.targetUser && isAnimatedIn : isAnimatedIn;

          return (
            <ModuleContainer
              key={key}
              x={x}
              y={y}
              w={w}
              h={h}
              isVisible={shouldShow}
            >
              {components[key]()}
            </ModuleContainer>
          );
        })}

        {appState.showAlert && (
          <VTTXAlert
            cmid={appState.targetUser?.cmid}
            onAccept={() => dispatch({ type: "HIDE_ALERT" })}
            onDecline={() => dispatch({ type: "HIDE_ALERT" })}
          />
        )}
      </div>
    </div>
  );
}