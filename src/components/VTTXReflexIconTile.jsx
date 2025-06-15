import React from "react"

export default function VTTXReflexIconTile({ id, icon: Icon, cmid, diit, type, isActive, title, onClick }) {
  const borderStyle = isActive
    ? "border-2 border-lime-400 bg-green-700"
    : "border border-white/10 hover:border-yellow-400 hover:bg-white/10"

  return (
    <div
      onClick={onClick}
      title={title || `${cmid} • ${diit}`}
      className={`w-[100px] h-[100px] rounded-[20px] flex items-center justify-center cursor-pointer transition-all ${borderStyle}`}
    >
      {Icon ? (
        <Icon className="w-[70px] h-[70px] object-contain" />
      ) : (
        <span className="text-xs text-white text-center px-1">
          {cmid || id || "Tile"}
        </span>
      )}
    </div>
  )
}
