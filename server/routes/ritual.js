const express = require("express");
const router = express.Router();
const { generateUniqueCmid } = require("../utils/generateCmid");

// POST /api/ritual/half-smash
router.post("/half-smash", (req, res) => {
  const entropy = req.body.entropy || `stream-${Date.now()}`;

  // 🔤 Semantic ID
  const cmid = generateUniqueCmid();

  // 🎭 DIIT path (served from server on-demand)
  const diit = `/api/icon/${encodeURIComponent(cmid)}`;

  // 🔐 Feed Signature
  const ictm = `ictm-${Buffer.from(entropy).toString("hex").slice(0, 16)}`;

  console.log("🧿 Ritual half-smash issued:", { cmid, ictm, diit });

  res.json({ cmid, ictm, diit });
});

module.exports = router;
