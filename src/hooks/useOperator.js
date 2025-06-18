console.log('⚠️ useContext in /Users/markemerrill/Developer/xmfb/vttx/src/hooks/useOperator.js');
import { useContext } from "react"
import { useContext } from "react"
import { useContext } from 'react'
import { AppContext } from '../AppContext'

export const useOperator = () => {
  const { dispatch } = useContext(AppContext)

  const speak = (msg) => {
    dispatch({
      type: 'LOG_EVENT',
      payload: `💬 AI Operator: ${msg}`
    })
  }

  return {
    speak,
    operatorStatus: 'observing'
  }
}
