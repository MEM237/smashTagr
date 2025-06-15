// src/App.jsx
import React, { useEffect, useState } from "react"
import { useApp, AppProvider } from "./AppContext"
import { useCam, CamProvider } from "./context/CamContext"
import AppRouter from "./components/AppRouter"
import CommandBar from "./components/CommandBar"
import { SCREENS } from "./constants"

function getInitialScreen() {
  // --- FIX ---
  // Use the correct, namespaced key to check for an existing session.
  // This must match the key used in AppContext.jsx.
  const identity = sessionStorage.getItem("halfSmash")
  return identity ? SCREENS.VTTX : SCREENS.PORTAL
}

function AppContent() {
  const [screen, setScreen] = useState(getInitialScreen)
  // Get the full appState to watch for changes.
  const { state: appState, dispatch } = useApp(); 
  const { stopCam } = useCam()
  
  // This effect ensures that whenever our identity changes in the state,
  // it gets saved to sessionStorage. This is a more reliable pattern.
  useEffect(() => {
    if (appState.halfSmash && appState.halfSmash.cmid) {
      console.log("💾 Saving new identity to sessionStorage...");
      sessionStorage.setItem("halfSmash", JSON.stringify(appState.halfSmash));
    }
  }, [appState.halfSmash]); // This runs only when the identity state changes.

  // 🔒 μZen: Domain lock
  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      alert("🛑 Presence system violation.\nThis artifact is not intended for public domains.")
    }
  }, [])

  // 📺 Log current screen
  useEffect(() => {
    console.log("✅ Current screen:", screen)
  }, [screen])

  // 🔁 Soft identity + cam reset. 
  const handleReset = () => {
    stopCam("manual_reset")
    dispatch({ type: "CLEAR_IDENTITY" })
    // --- FIX ---
    // Use the correct, namespaced key to remove the session.
    sessionStorage.removeItem("halfSmash")
    localStorage.removeItem("xmfb-key"); // Also clear the persistent key
    setScreen(SCREENS.PORTAL)
  }

  // --- IMPROVEMENT ---
  // The handler now only dispatches the action. The useEffect above handles saving.
  // The page reload has been removed to prevent race conditions and provide a smoother experience.
  const handleDevHardReset = () => {
    dispatch({ type: "RESET_IDENTITY" });
  }

  return (
    <>
      {/* This conditional logic now correctly wraps ONLY the CommandBar */}
      {screen !== SCREENS.PORTAL && (
        <CommandBar 
          handleReset={handleReset} 
          handleDevHardReset={handleDevHardReset}
          setScreen={setScreen}
        />
      )}
      
      {/* AppRouter is now correctly outside the conditional, so it always renders */}
      <AppRouter screen={screen} setScreen={setScreen} />
    </>
  );
}

// 🧠 Core: Provider-wrapped export
export default function App() {
  return (
    <AppProvider>
      <CamProvider>
        <AppContent />
      </CamProvider>
    </AppProvider>
  );
}