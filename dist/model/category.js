"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Subcategory",
        },
    ],
});
const Category1 = mongoose_1.default.model("Category", categorySchema);
module.exports = Category1;
//# sourceMappingURL=category.js.map