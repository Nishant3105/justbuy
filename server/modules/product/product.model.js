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
    stockStatus: { type: String, enum: ["in_stock", "out_of_stock"] },

    status:{ type: String, enum: ["active", "draft", "disabled"] },
    visibility: { type: String, enum: ["public", "private"] },

    description: String,

    mainImage: String,
    detailImage: String,
    galleryImages: [String],

    metaTitle: String,
    metaKeywords: String,
    metaDescription: String,

    sold: { type: Number, default: 0 },           
    revenue: { type: Number, default: 0 },        
    lastSoldAt: { type: Date },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
