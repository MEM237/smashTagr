import React, { createContext, useContext, useReducer } from "react"
import { AppReducer, initialState } from "./AppReducer"

const AppContext = createContext()

// 🧠 Hydrate from sessionStorage if available
const initializer = (initialValue) => {
  try {
    const stored = sessionStorage.getItem("halfSmash")
    if (stored) {
      console.log("💧 Hydrating state from sessionStorage")
      const parsedStored = JSON.parse(stored)
      return {
        ...initialValue,
        halfSmash: {
          ...initialValue.halfSmash,
          cmid: parsedStored.cmid,
          diit: parsedStored.diit,
          ictm: parsedStored.ictm,
        },
      }
    }
  } catch (err) {
    console.error("⚠️ Failed to hydrate from sessionStorage:", err)
  }
  return initialValue
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState, initializer)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// 🪝 Global access to AppContext
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
