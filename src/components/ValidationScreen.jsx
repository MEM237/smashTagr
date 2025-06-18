import React, { useEffect, useRef } from "react"
import { useApp } from "../AppContext"
import { useCam } from "../context/CamContext"
import RitualSigil from "../components/RitualSigil"

export default function ValidationScreen({ onComplete }) {
  const { state: appState } = useApp()
  const { stream } = useCam()
  const videoRef = useRef(null)

  const cmid = appState?.halfSmash?.cmid || "unknown_cmid"
    const diit = appState?.halfSmash?.diit || "" // ✅ Get the DIIT symbol from state

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error("A real video error occurred:", error)
          }
        })
      }
    }
  }, [stream])

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative">
      {/* Main card container */}
      <div className="w-[600px] h-[420px] rounded-[50px] bg-[#111] border border-orange-500 shadow-inner p-4 relative">

        {/* Content layout */}
        <div className="w-full h-full bg-[#222] rounded-[30px] font-jura flex flex-row items-center justify-between p-6">

          {/* Left Column (Cam feed) */}
          <div className="flex-shrink-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-[200px] h-[340px] rounded-[30px] object-cover"
              aria-label="Local camera feed"
            />
          </div>

          {/* Right Column (Sigil + CMID# + DIIT#) */} {/* ✅ Updated comment for clarity */}
          <div className="flex flex-col items-center justify-center h-full w-full">
            <RitualSigil entropy={cmid} />
            <div className="text-4xl mt-6 font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent break-all">
              #{cmid}
            </div>
          
          </div>
        </div>

        {/* Confirmation button */}
        <button
          onClick={onComplete}
          className="bg-green-400 w-[60px] h-[40px] rounded-[15px] hover:shadow-[0_0_10px_#00ff8c] absolute right-8 bottom-8"
          aria-label="Complete validation"
        />
      </div>
    </div>
  )
}
