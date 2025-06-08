// utils/validators.js

/**
 * Check if a tile has valid presence identity.
 * Must have non-empty `cmid` and `diit`.
 */
export function isValidPresence(tile) {
  return (
    tile &&
    typeof tile.cmid === "string" &&
    tile.cmid.trim().length > 0 &&
    typeof tile.diit === "string" &&
    tile.diit.trim().length > 0
  )
}

/**
 * Check if a feedSig string is valid
 */
export function isValidFeedSig(feedSig) {
  return typeof feedSig === "string" && feedSig.startsWith("ICTM#")
}

/**
 * Check if a user is a duplicate (by CMID# and DIIT#)
 */
export function isDuplicateUser(seenSet, user) {
  if (!isValidPresence(user)) return false
  const key = `${user.cmid}::${user.diit}`
  return seenSet.has(key)
}
