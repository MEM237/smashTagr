console.log('⚠️ useContext in /Users/markemerrill/Developer/xmfb/vttx-mvd/src/hooks/useSmashSync.js');
import { useContext } from "react"
import { useContext } from "react"
import { useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'

export const useSmashSync = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    if (state.user.feedSig && state.user.cmid) {
      dispatch({
        type: 'LOG_EVENT',
        payload: `🔐 %smash-tag:½ synced — ${state.user.cmid}`
      })
    }
  }, [state.user.feedSig, state.user.cmid, dispatch])
}
