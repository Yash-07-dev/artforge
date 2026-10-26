
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const mongoose = require("mongoose");
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



// POST /api/artworks - create artwork
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, imageUrl, category, artistName } = req.body;

    const artwork = await Artwork.create({
      title,
      description,
      imageUrl,
      category,
      artistName,
      owner: req.user.userId,
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

// Validate MongoDB IDs for individual artwork routes
function validateArtworkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid artwork ID",
    });
  }

  next();
}

// GET /api/artworks/:id - retrieve one artwork
router.get("/:id", validateArtworkId, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    res.status(200).json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    console.error("Fetch artwork error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve artwork",
    });
  }
});

// PUT /api/artworks/:id - update artwork
router.put("/:id", authMiddleware, validateArtworkId, async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "imageUrl",
      "category",
      "artistName",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const artwork = await Artwork.findByIdAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    res.status(200).json({
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

    console.error("Update artwork error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update artwork",
    });
  }
});

// DELETE /api/artworks/:id - delete artwork
router.delete("/:id", authMiddleware, validateArtworkId, async (req, res) => {
  try {
    const artwork = await Artwork.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Artwork deleted successfully",
      data: artwork,
    });
  } catch (error) {
    console.error("Delete artwork error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete artwork",
    });
  }
});

module.exports = router;
