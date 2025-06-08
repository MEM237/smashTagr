const fs = require("fs");
const path = require("path");

const BASE_DIR = path.join(__dirname, "../public/icons");
const manifest = {
  agents: [],
  users: [],
  ritual_agents: [],
  variable_agents: [],
  ekaf_agents: [],
};

for (const [key, arr] of Object.entries(manifest)) {
  const dir = path.join(BASE_DIR, key);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".svg"));
  arr.push(...files.map(f => path.basename(f, ".svg")));
}

fs.writeFileSync(
  path.join(BASE_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("✅ manifest.json created at public/icons/");

