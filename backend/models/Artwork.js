
const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Artwork title is required"],
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    imageUrl: {
      type: String,
      required: [true, "Artwork image URL is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Artwork category is required"],
      trim: true,
    },

    artistName: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Artwork", artworkSchema);
