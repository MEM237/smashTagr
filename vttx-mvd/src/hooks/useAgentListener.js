console.log('⚠️ useContext in /Users/markemerrill/Developer/xmfb/vttx-mvd/src/hooks/useAgentListener.js');
import { useContext } from "react"
import { useContext } from "react"
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../AppContext'

export const useAgentListener = () => {
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({
        type: 'REGISTER_AGENT',
        payload: {
          id: 'ZBLD.Δee',
          data: { mode: 'watch', symbol: '🟧' }
        }
      })
      dispatch({ type: 'LOG_EVENT', payload: '👾 Agent ZBLD.Δee watching' })
    }, 3000)

    return () => clearTimeout(timeout)
  }, [dispatch])
}
