const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const iconRoute = require("./routes/icon");
app.use("/api/icon", iconRoute);

const bridgeRoute = require("./routes/bridge");
app.use("/api/bridge", bridgeRoute);

const ritualRoutes = require("./routes/ritual")
console.log("✅ Loading routes from ritual.js:", ritualRoutes); // <-- ADD THIS LINE

app.use("/api/ritual", ritualRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🌀 XMFB Ritual Server running on http://localhost:${PORT}`)
})
