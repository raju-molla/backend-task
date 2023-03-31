import mongoose, { Schema } from "mongoose";
import {SubCategory} from "../interface/subCategory";

const categorySchema = new mongoose.Schema<SubCategory>({
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
const Subcategory1 = mongoose.model<SubCategory>("Subcategory", categorySchema);
module.exports = Subcategory1;
