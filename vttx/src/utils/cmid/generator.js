// src/utils/cmid/generator.js

const cmidListOne = ["dreamer", "hollow", "ghost", "fire", "moss", "echo", "glitch", "shadow"]
const cmidListTwo = ["light", "drip", "bender", "flux", "punch", "zone", "static", "hymn"]

const diitIcons = [
  "ramen-bowl",
  "glitch-star",
  "void-spiral",
  "eye-sigil",
  "vttx-heart",
  "delta-worm",
  "mirror-sphere",
  "sigil-flower"
]

export function generateCMID() {
  const partOne = cmidListOne[Math.floor(Math.random() * cmidListOne.length)]
  const partTwo = cmidListTwo[Math.floor(Math.random() * cmidListTwo.length)]
  return `${partOne}-${partTwo}`
}

export function generateDIIT() {
  return diitIcons[Math.floor(Math.random() * diitIcons.length)]
}

