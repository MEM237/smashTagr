console.log('⚠️ useContext in /Users/markemerrill/Developer/xmfb/vttx/src/components/Shared/TextPortal.jsx');
import { useContext } from "react"
import React, { useContext } from "react"
import { AppContext } from '../../AppContext'

const redact = (entry) => {
  if (entry.includes('FeedSig')) return '🔒 FeedSig logged'
  if (entry.includes('%smash-tag')) return '🔒 %smash-tag event recorded'
  return entry
}

export default function TextPortal() {
  const { state } = useContext(AppContext)
  const logs = state.logs.slice(-6).reverse()

  return (
    <div className="text-xs max-h-[240px] overflow-y-auto">
      {logs.map((entry, idx) => (
        <div key={idx} className="mb-1">
          {redact(entry)}
        </div>
      ))}
    </div>
  )
}
