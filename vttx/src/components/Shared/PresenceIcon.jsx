import React from 'react'

export default function PresenceIcon({ status }) {
  let icon = '⚫'
  if (status === 'stanby') icon = '🟡'
  else if (status === 'present') icon = '🟢'

  return <span>{icon}</span>
}
