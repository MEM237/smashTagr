const fs = require("fs");
const path = require("path");

const COMPONENT_DIR = "src/components/icons";
const OUTPUT_DIR = "public/icons";

function extractSvg(content) {
  const match = content.match(/<svg[\s\S]*<\/svg>/);
  return match ? match[0] : null;
}

function processDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  files.forEach((file) => {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDir(filePath); // recurse
    } else if (file.endsWith(".jsx")) {
      const relativePath = path.relative(COMPONENT_DIR, filePath);
      const targetSubDir = path.dirname(relativePath);
      const name = path.basename(file, ".jsx").replace(/Δ/g, "-");
      const content = fs.readFileSync(filePath, "utf8");
      const svg = extractSvg(content);

      if (svg) {
        const fullOutputDir = path.join(OUTPUT_DIR, targetSubDir);
        fs.mkdirSync(fullOutputDir, { recursive: true });
        const outputPath = path.join(fullOutputDir, `${name}.svg`);
        fs.writeFileSync(outputPath, svg, "utf8");
        console.log(`✅ Saved: ${outputPath}`);
      } else {
        console.warn(`⚠️ No <svg> found in: ${filePath}`);
      }
    }
  });
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
processDir(COMPONENT_DIR);

