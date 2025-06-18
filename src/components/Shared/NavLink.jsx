import React from 'react'
import { Link } from 'react-router-dom'

export default function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="text-blue-400 underline hover:text-blue-200 text-sm"
    >
      {label}
    </Link>
  )
}
