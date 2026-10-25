
const express = require("express");
const Artwork = require("../models/Artwork");

const router = express.Router();

// GET /api/artworks - retrieve all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks,
    });
  } catch (error) {
    console.error("Fetch artworks error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve artworks",
    });
  }
});

// POST /api/artworks - create an artwork
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl, category, artistName } = req.body;

    const artwork = await Artwork.create({
      title,
      description,
      imageUrl,
      category,
      artistName,
    });

    res.status(201).json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create artwork error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create artwork",
    });
  }
});

module.exports = router;
