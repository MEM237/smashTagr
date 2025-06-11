const { createCanvas } = require("canvas");

function generateDiitCanvas(entropy = "default") {
  const canvas = createCanvas(150, 150);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 150, 150);

  ctx.strokeStyle = "#ff6600";
  ctx.lineWidth = 4;

  const hash = Array.from(entropy).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  for (let i = 0; i < 5; i++) {
    const angle = (hash * i) % (2 * Math.PI);
    ctx.beginPath();
    ctx.arc(75, 75, 20 + i * 10, 0, angle, false);
    ctx.stroke();
  }

  return canvas.toDataURL(); // returns base64-encoded image
}

module.exports = { generateDiitCanvas };
