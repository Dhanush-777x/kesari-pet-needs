// models/seller.js
import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Default value to false, indicating the seller is not verified
    },
  },
  { timestamps: true }
);

const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

export default Seller;
