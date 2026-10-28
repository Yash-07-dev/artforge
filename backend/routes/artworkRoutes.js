
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const mongoose = require("mongoose");
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

const router = express.Router();


/* GET /api/artworks/mine - retrieve the logged-in user's artworks */
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const artworks = await Artwork.find({
      owner: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks,
    });
  } catch (error) {
    console.error("Fetch my artworks error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve your artworks.",
    });
  }
});


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



const { Readable } = require("stream");


//MongoDB check ArtworkID is valid or not
function validateArtworkId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid artwork ID.",
    });
  }

  next();
}

// POST /api/artworks - create artwork with Cloudinary image upload
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    let uploadedAssetId;

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select an image to upload.",
        });
      }

      const { title, description, category } = req.body;

      if (!title?.trim() || !category?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title, category are required.",
        });
      }

      const user = await User.findById(req.user.userId).select("name");

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Your account could not be found. Please log in again.",
  });
}

      

      // Upload the selected file to Cloudinary.
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "artforge/artworks",
            resource_type: "image",
          },
          (error, uploadResult) => {
            if (error) return reject(error);
            resolve(uploadResult);
          }
        );

        Readable.from(req.file.buffer).pipe(stream);
      });

      uploadedAssetId = result.public_id;

      // Save only the image URL and metadata in MongoDB.
      const artwork = await Artwork.create({
        title: title.trim(),
        description: description?.trim() || "",
        imageUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
        category: category.trim(),
        artistName: user.name,
        owner: req.user.userId,
      });

      return res.status(201).json({
        success: true,
        message: "Artwork uploaded successfully.",
        data: artwork,
      });
    } catch (error) {
      // If MongoDB saving fails after Cloudinary upload, clean up the image.
      if (uploadedAssetId) {
        try {
          await cloudinary.uploader.destroy(uploadedAssetId);
        } catch (cleanupError) {
          console.error("Cloudinary cleanup error:", cleanupError.message);
        }
      }

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      console.error("Create artwork error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to upload artwork.",
      });
    }
  }
);


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
