import mongoose, { Schema } from "mongoose";
import { Category } from "../interface/category";

const categorySchema = new mongoose.Schema<Category>({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});
const Category1 = mongoose.model<Category>("Category", categorySchema);
module.exports = Category1;
