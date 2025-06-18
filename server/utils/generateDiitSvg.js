// utils/generateDiitSvg.js
function generateDiitSvg(seed = "default-seed") {
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  const secondaryHue = (hue + 45) % 360;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
    <rect width="150" height="150" rx="40"
          fill="hsl(${hue}, 30%, 85%)"
          stroke="hsl(${hue}, 40%, 60%)"
          stroke-width="5"/>

    <circle cx="75" cy="75" r="40"
            fill="hsl(${secondaryHue}, 50%, 65%)"/>

    <path d="M40,75 L75,35 L110,75 Z"
          fill="hsla(${hue}, 60%, 40%, 0.3)"/>

    <defs>
      <radialGradient id="shadeGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <circle cx="75" cy="75" r="40" fill="url(#shadeGradient)"/>
  </svg>
  `.trim();
}

module.exports = { generateDiitSvg };
