// ValidationPortal.jsx
import React, { useEffect, useRef } from "react" // Import useRef
import { motion } from "framer-motion"

const IntroSigilStack = () => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    <div className="flex flex-col items-center space-y-3">
      <motion.img
        src="/icons/uZen-icon.svg"
        alt="μZen icon"
        className="w-[120px] h-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      />
      <motion.img
        src="/icons/uZen-txt.svg"
        alt="μZen text"
        className="w-[220px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 1.6 }}
      />
    </div>
  </motion.div>
)

export default function ValidationPortal({ onComplete }) {
  // Use useRef directly in the component body to create a ref that persists
  // across renders and is initialized once per component instance.
  const triggeredRef = useRef(false) // Initialize with false

  useEffect(() => {
    const handleAdvance = () => {
      // Use triggeredRef.current here
      if (triggeredRef.current) {
        console.log("ValidationPortal: handleAdvance skipped (already triggered).")
        return
      }

      triggeredRef.current = true
      console.log("ValidationPortal: handleAdvance triggered. Calling onComplete().")
      onComplete()
    }

    // Add event listeners
    window.addEventListener("keydown", handleAdvance)
    window.addEventListener("click", handleAdvance)

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener("keydown", handleAdvance)
      window.removeEventListener("click", handleAdvance)
    }
  }, [onComplete]) // Dependency array: onComplete doesn't change often, but is good practice.

  return (
    <div className="w-[1445px] h-[980px] bg-black text-white flex items-center justify-center relative overflow-hidden">
      <IntroSigilStack />
    </div>
  )
}



