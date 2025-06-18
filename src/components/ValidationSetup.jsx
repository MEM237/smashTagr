// ValidationSetup.jsx
import React from "react"
import { motion } from "framer-motion" // Import motion
import { useApp } from "../AppContext"
import { useCam } from "../context/CamContext"

export default function ValidationSetup({ onValidated }) {
  const { dispatch } = useApp()
  const { startCam } = useCam()

  // ... (handleValidate function remains the same) ...
  const handleValidate = async () => {
    console.log("📸 Requesting camera access via CamContext...");

    try {
      await startCam();
      console.log("✅ Camera access granted and stream set in CamContext.");

      dispatch({ type: "SET_CAM_PERMISSION", payload: true });

      console.log("🧪 Initiating identity ritual handshake...");

      const entropySeed = `stream-${Date.now()}`;
      const res = await fetch("/api/ritual/half-smash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entropy: entropySeed }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed ritual handshake: ${res.status} ${errorData}`);
      }

      const { cmid, diit, ictm } = await res.json();
      console.log("🔐 Ritual complete:", { cmid, diit, ictm });

      dispatch({
        type: "SET_HALF_SMASH",
        payload: { cmid, diit, ictm },
      });

      sessionStorage.setItem(
        "halfSmash",
        JSON.stringify({ cmid, diit: diit, ictm })
      );

      const confirmFlash = document.createElement("div");
      confirmFlash.textContent = "🪷 identity confirmed";
    
      confirmFlash.className = document.createElement("div");
      confirmFlash.textContent = "🪷 identity confirmed";
      
        "fixed top-4 right-4 z-50 text-green-400 font-jura text-sm bg-black px-3 py-1 rounded-xl shadow-lg animate-pulse-fast";
      document.body.appendChild(confirmFlash);
      setTimeout(() => confirmFlash.remove(), 2000);

      if (onValidated) onValidated();

    } catch (err) {
      console.error("🚫 Camera or ritual failure:", err);
      alert("Camera permission and identity ritual are required. " + err.message);
    }
  };


   // ValidationSetup.jsx

  // ... (keep the imports and the handleValidate function as they are) ...

  return (
    <motion.div
      className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: "easeIn" } }}
    >
      {/* 1. This is the OUTER container. Its classes are updated to match the Agent Dialog's style. */}
      {/* It now has the pink border and the darker background. */}
      <div className="w-[475px] h-[340px] rounded-[50px] bg-[#111] border border-orange-500 shadow-inner p-4 flex flex-col">
        
        {/* 2. This NEW inner container holds all the content. It gets the lighter background */}
        {/* and replicates the original flex layout to keep everything positioned correctly. */}
        <div className="w-full h-full bg-[#222] rounded-[30px] text-white font-jura flex flex-col justify-between items-center text-center p-6 relative">
          
          {/* 3. The "spiced up" title with new styling. */}
          <div className="text-4xl mt-4 font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            Welcome to XMFb
          </div>

          <div className="text-left text-orange-400 text-4xl w-full px-6 leading-snug">
            Create your own<br /> presence.
          </div>

          <div className="text-white text-lg mb-4 animate-pulse-slow">
            enable camera permissions &gt;
          </div>

          <button
            onClick={handleValidate}
            className="bg-green-400 w-[60px] h-[100px] rounded-[15px] hover:shadow-[0_0_10px_#00ff8c] absolute right-6 bottom-6"
          />
        </div>
      </div>
    </motion.div>
  )
}