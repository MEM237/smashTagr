const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

router.post("/agent-bridge", (req, res) => {
  const inputData = JSON.stringify(req.body);

  const py = spawn("python3", ["./uZen/engine/bridge_reflex.py"]);

  let output = "";
  py.stdout.on("data", (data) => {
    output += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  py.on("close", (code) => {
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (e) {
      res.status(500).json({ status: "error", message: "Invalid Python response" });
    }
  });

  py.stdin.write(inputData);
  py.stdin.end();
});

module.exports = router;
