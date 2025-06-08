console.log('⚠️ useContext in /Users/markemerrill/Developer/xmfb/vttx/src/hooks/usePresenceChannel.js');
import { useContext } from "react"
import { useContext } from "react"
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../AppContext'

export const usePresenceChannel = () => {
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    const mockPresence = () => {
      dispatch({ type: 'LOG_EVENT', payload: '👁️ PresenceChannel activated' })
    }

    mockPresence()

    return () => {
      dispatch({ type: 'LOG_EVENT', payload: '👁️ PresenceChannel closed' })
    }
  }, [dispatch])
}
