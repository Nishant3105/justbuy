const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  type: { type: String, enum: ["billing", "shipping"] },
  fullName: String,
  phone: String,
  mobile: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  isDefault: Boolean,
});

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,

    role: {
      type: String,
      enum: ["admin", "staff", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
    permissions: {
      read: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
    },

    authProvider: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },

    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    lastLoginAt: Date,

    addresses: [AddressSchema],

    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },

    newsletterSubscribed: { type: Boolean, default: false },
    marketingConsent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.index({ createdAt: -1 });   
UserSchema.index({ lastLoginAt: -1 }); 
UserSchema.index({ role: 1 });         
UserSchema.index({ status: 1 });       
UserSchema.index({ totalSpent: -1 });

module.exports = mongoose.model("User", UserSchema);
