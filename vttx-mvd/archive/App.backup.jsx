import React, { useEffect } from 'react'
import { AppProvider } from './AppContext'
import SplashScreen from './components/SplashScreen'

export default function App() {
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      alert('🛑 Presence system violation.\nThis artifact is not intended for public domains.')
    }
  }, [])

  return (
    <AppProvider>
      <SplashScreen />
    </AppProvider>
  )
}

