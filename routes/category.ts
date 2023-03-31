import express from "express";
const categoryController = require("../controller/category");

const router = express.Router();
router.post("/", categoryController.createCat);
router.post("/sub", categoryController.createSubCat);
router.get("/:id", categoryController.getAll);
router.delete("/:id", categoryController.catDelete);
router.put("/:id", categoryController.catUpdate);
module.exports = router;
