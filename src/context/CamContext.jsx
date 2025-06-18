import React, { createContext, useContext, useState, useEffect } from "react"

const CamContext = createContext()

export function CamProvider({ children }) {
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  const startCam = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(s)
      setError(null)
      console.log("🎥 Cam stream started.")
    } catch (err) {
      console.error("❌ Cam access denied or failed:", err)
      setError(err)
    }
  }

  const stopCam = (reason = "manual") => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      console.log(`🛑 Cam stream stopped (${reason}).`)
    }
  }

  // ✅ Correct location for the useEffect hook
  useEffect(() => {
    const handleBeforeUnload = () => {
      // This calls the cleanup function when the tab is closed or reloaded
      stopCam("browser_exit")
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [stream]) // The dependency array is important for re-binding if the stream changes

  return (
    <CamContext.Provider value={{ stream, error, startCam, stopCam }}>
      {children}
    </CamContext.Provider>
  )
}

export function useCam() {
  return useContext(CamContext)
}