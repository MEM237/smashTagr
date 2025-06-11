const fs = require("fs");
const path = require("path");
const wordList01 = require("./cranjisMcbasketball/reflectorWords01");
const wordList02 = require("./cranjisMcbasketball/reflectorWords02");

// Path to CMID# log
const logFilePath = path.join(__dirname, "../data/cmid_log.json");

// Ensure the log file exists
function ensureLogFile() {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, JSON.stringify([]));
  }
}

// Load used CMIDs
function getUsedCmids() {
  ensureLogFile();
  const raw = fs.readFileSync(logFilePath);
  return JSON.parse(raw);
}

// Save new CMID to log
function saveCmid(cmid) {
  const used = getUsedCmids();
  used.push(cmid);
  fs.writeFileSync(logFilePath, JSON.stringify(used, null, 2));
}

// Generate a non-repeating, mirrored CMID#
function generateReflectedCmid() {
  const first = wordList01[Math.floor(Math.random() * wordList01.length)];
  const second = wordList02[Math.floor(Math.random() * wordList02.length)];

  // Optional rule: disallow duplicates like "paper_paper"
  if (first === second) return generateReflectedCmid();

  return `${first}_${second}`;
}

// Main CMID# generator using reflection + logging
function generateUniqueCmid() {
  const used = new Set(getUsedCmids());

  let attempts = 0;
  while (attempts < 1000) {
    const candidate = generateReflectedCmid();

    if (!used.has(candidate)) {
      saveCmid(candidate);
      return candidate;
    }

    attempts++;
  }

  throw new Error("CMID# generation exhausted all attempts");
}

module.exports = {
  generateUniqueCmid
};
