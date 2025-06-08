console.log('⚠️ useContext in /Users/markemerrill/Developer/xmfb/vttx/src/components/Shared/AgentList.jsx');
import { useContext } from "react"
import React, { useContext } from "react"
import { AppContext } from '../../AppContext'

export default function AgentList() {
  const { state } = useContext(AppContext)
  const agents = Object.entries(state.agents)

  return (
    <div>
      <div className="font-bold mb-1">👾 Agents</div>
      {agents.length === 0 ? (
        <div className="text-sm italic text-yellow-400">no agents present</div>
      ) : (
        agents.map(([id, data]) => (
          <div key={id} className="text-sm text-yellow-300 mb-1">
            {data.symbol} {id} <span className="text-yellow-500">[{data.mode}]</span>
          </div>
        ))
      )}
    </div>
  )
}
