import React, { useEffect, useRef, useState } from 'react'
import ramenIcon from '../assets/fonts/Icon ramen dining.svg'

export default function RitualTransition({ onComplete }) {
  const videoRef = useRef(null)
  const [fadeToBlack, setFadeToBlack] = useState(false)
  const [phase, setPhase] = useState(0)
  const [showFirstText, setShowFirstText] = useState(false)
  const [showSecondText, setShowSecondText] = useState(false)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setPhase(2), 1000)
    } else if (phase === 2) {
      setTimeout(() => setShowFirstText(true), 500)
      setTimeout(() => {
        setShowFirstText(false)
        setShowSecondText(true)
      }, 2250)
      setTimeout(() => {
        setShowSecondText(false)
        setShowHeader(true)
      }, 4000)
      setTimeout(() => {
        setPhase(3)
        onComplete() // 💫 Final transition
      }, 6000)
    }

  }, [phase, onComplete])

  const handleVideoEnd = () => setFadeToBlack(true)

  useEffect(() => {
    if (fadeToBlack) setPhase(1)
  }, [fadeToBlack])

  return (
    <div className="relative w-[1445px] h-[980px] bg-black overflow-hidden">
      {phase === 0 && (
        <video
          ref={videoRef}
          src="/web2-5.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute top-1/2 left-1/2 w-[1280px] h-[720px] 
-translate-x-1/2 -translate-y-1/2 object-contain"
        />
      )}

      {(phase >= 1) && (
        <div className={`absolute top-0 left-0 w-full h-full bg-black 
transition-opacity duration-1000 ${phase === 1 ? 'opacity-100' : 'opacity-0'}`} 
/>
      )}

      {phase >= 2 && (
        <>
          <img
            src={ramenIcon}
            alt="ramen icon"
            className="absolute"
            style={{ top: '430px', left: '663px', width: '120px', height: '120px' 
}}
          />

          {showFirstText && (
            <p className="absolute text-yellow-400 text-xl font-jura font-light 
lowercase text-center w-full" style={{ top: '570px' }}>
              you may say I am a dreamer
            </p>
          )}

          {showSecondText && (
            <p className="absolute text-yellow-400 text-xl font-jura font-light 
lowercase text-center w-full" style={{ top: '570px' }}>
              but I am not the only one
            </p>
          )}

          {showHeader && (
            <p className="absolute text-yellow-400 text-2xl font-jura font-light 
lowercase text-center w-full" style={{ top: '390px' }}>
              μZen::/
            </p>
          )}
        </>
      )}
    </div>
  )
}

