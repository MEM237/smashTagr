const express = require("express");
const router = express.Router();
const { generateDiitCanvas } = require("../utils/generateDiitCanvas");

router.get("/:entropy", (req, res) => {
  const entropy = req.params.entropy || "default";
  const dataUrl = generateDiitCanvas(entropy);
  const base64 = dataUrl.split(",")[1];
  const imgBuffer = Buffer.from(base64, "base64");

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": imgBuffer.length
  });
  res.end(imgBuffer);
});

module.exports = router;
