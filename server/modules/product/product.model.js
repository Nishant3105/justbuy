const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    slug: String,
    brand: String,
    category: String,
    subCategory: String,

    mrp: Number,
    sellingPrice: Number,
    discount: Number,
    taxClass: String,

    stockQty: Number,
    lowStockThreshold: Number,
    stockStatus: String,

    status: String,
    visibility: String,

    description: String,

    mainImage: String,
    detailImage: String,
    galleryImages: [String],

    metaTitle: String,
    metaKeywords: String,
    metaDescription: String,

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
