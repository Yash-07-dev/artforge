
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const artworkRoutes = require("./routes/artworkRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/artworks", artworkRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Basic test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ArtForge backend is running!",
  });
});

// API health and database status
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ArtForge API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully");

    app.listen(PORT, () => {
      console.log(`ArtForge backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start ArtForge backend:", error.message);
    process.exit(1);
  }
}

startServer();
