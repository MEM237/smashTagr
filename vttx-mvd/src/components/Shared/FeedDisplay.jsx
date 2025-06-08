import React from 'react'

export default function FeedDisplay({ label, color }) {
  return (
    <div
      className={`w-[225px] h-[150px] ${color} rounded-[15px] flex items-center justify-center shadow-lg`}
    >
      <span className="text-white text-sm">{label}</span>
    </div>
  )
}
