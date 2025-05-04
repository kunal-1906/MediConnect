require("dotenv").config();
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ✅ API routes
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/admin', require("./routes/adminRoutes"));
app.use('/api/v1/doctor', require("./routes/doctorRoutes"));

// ✅ API health check
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// ✅ Frontend serving (only in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// ✅ Start Server
const port = process.env.PORT || 8080;
const mode = process.env.NODE_MODE || "development";

app.listen(port, () => {
  console.log(`Server running in ${mode} MODE ON PORT ${port}`.bgCyan.white);
});
