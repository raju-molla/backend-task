"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController = require("../controller/category");
const router = express_1.default.Router();
router.post("/", categoryController.createCat);
router.post("/sub", categoryController.createSubCat);
router.get("/:id", categoryController.getAll);
router.delete("/:id", categoryController.catDelete);
router.put("/:id", categoryController.catUpdate);
module.exports = router;
//# sourceMappingURL=category.js.map