// utils/generateDiitSymbol.js

function getRandomChar(rangeStart, rangeEnd) {
  const code = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart
  return String.fromCharCode(code)
}

function pickFrom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function generateDiitSymbol() {
  // 🜃 Step 1: Choose base character (symbolic plane)
  const baseOptions = [
    getRandomChar(0x16A0, 0x16F0), // Runes
    getRandomChar(0x2200, 0x22FF), // Math symbols
    getRandomChar(0x25A0, 0x25FF), // Geometric shapes
    getRandomChar(0x1F300, 0x1F5FF), // Misc symbols + pictographs
    pickFrom(["⚘", "☥", "☯", "☽", "☼", "𓂀", "🜏", "🜂", "⟁"]) // Sacred glyphs
  ]

  const base = pickFrom(baseOptions)

  // 🌀 Step 2: Add 1–3 combining accents (diacritics / glitch modifiers)
  const modifierCount = Math.floor(Math.random() * 3) + 1
  let modifiers = ""
  for (let i = 0; i < modifierCount; i++) {
    modifiers += getRandomChar(0x0300, 0x036F)
  }

  // Final DIIT# symbol (visually fused)
  return base + modifiers
}
