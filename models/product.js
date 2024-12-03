import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  disPrice: {
    type: Number,
    required: true,
  },
  disPercentage: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
