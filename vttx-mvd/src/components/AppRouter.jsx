// src/components/AppRouter.jsx
import React from "react"
import { motion, AnimatePresence } from "framer-motion" // Import AnimatePresence
import ValidationPortal from "./ValidationPortal"
import ValidationSetup from "./ValidationSetup"
import ValidationScreen from "./ValidationScreen"
import VTTXWindow from "./VTTX/VTTXWindow"
import { SCREENS } from "../constants"

export default function AppRouter({ screen, setScreen }) {
  // By wrapping the switch statement in AnimatePresence, we enable exit
  // animations on our screen components before they are unmounted.
  // The `mode="wait"` prop ensures one component animates out before the next animates in.
  return (
    <AnimatePresence mode="wait">
      {/* We add a unique key to the wrapping div to ensure React treats each screen change as a distinct component swap */}
      <motion.div key={screen} className="h-full w-full">
        {(() => {
          switch (screen) {
            case SCREENS.PORTAL:
              return <ValidationPortal onComplete={() => setScreen(SCREENS.SETUP)} />
            case SCREENS.SETUP:
              return <ValidationSetup onValidated={() => setScreen(SCREENS.SCREEN)} />
            case SCREENS.SCREEN:
              return <ValidationScreen onComplete={() => setScreen(SCREENS.VTTX)} />
            case SCREENS.VTTX:
              return <VTTXWindow />
            default:
              return <ValidationPortal onComplete={() => setScreen(SCREENS.SETUP)} />
          }
        })()}
      </motion.div>
    </AnimatePresence>
  )
}