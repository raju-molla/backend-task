"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require("../model/category");
const Subcategory = require("../model/subCategory");
exports.createCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = new Category({
            name,
        });
        yield category.save();
        return res.send(category);
    }
    catch (err) {
        return res.send(err);
    }
});
exports.createSubCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, pId } = req.body;
        const sub = new Subcategory({
            name,
        });
        yield sub.save();
        let cat = yield Category.findOne({ _id: pId });
        if (cat) {
            cat.subCategory.push(sub);
            yield cat.save();
            console.log(cat);
        }
        else {
            let subCat = yield Subcategory.findOne({ _id: pId });
            console.log(subCat);
            subCat.subCategory.push(sub);
            yield subCat.save();
        }
        return res.send(sub);
    }
    catch (err) {
        return res.send(err);
    }
});
// async function getAllSubcategories(categoryId) {
//   // console.log(categoryId);
//   const category = await Category.findById(categoryId).populate("subCategory");
//   // console.log(category);
//   let subcategories = [];
//   for (let subcategory of category.Subcategory) {
//     subcategories.push(subcategory);
//     const subSubcategories = await getAllSubcategories(subcategory._id);
//     subcategories.push(...subSubcategories);
//     console.log(subcategory);
//   }
//   return subcategories;
// }
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.params);
        const id = req.params.id;
        // // console.log(id);
        // const allSubcategories = await getAllSubcategories(id);
        // console.log(allSubcategories);
        let result = yield Category.findById(id).populate("subCategory");
        console.log(result);
        if (result == null) {
            let ans = yield Subcategory.findById(id).populate("subCategory");
            return res.send(ans);
        }
        return res.send(result);
    }
    catch (err) {
        return res.send(err);
    }
});
// Update
exports.catUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const cat = yield Category.findOne({ _id: id });
        const sub = yield Subcategory.findOne({ _id: id });
        if (cat) {
            let catUpdate = yield Category.findOneAndUpdate({ _id: id }, {
                $set: req.body,
            }, {
                new: true,
            });
            return res.send(catUpdate);
        }
        else {
            let subUpdate = yield Subcategory.findOneAndUpdate({ _id: id }, {
                $set: req.body,
            }, {
                new: true,
            });
            return res.send(subUpdate);
        }
    }
    catch (err) {
        return res.send(err);
    }
});
//  delete
exports.catDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cat = yield Category.findOne({ _id: id });
        const sub = yield Subcategory.findOne({ _id: id });
        if (sub) {
            for (var i = 0; i < sub.subCategory.length; i++) {
                // console.log(sub.subCategory[i]);
                const id = sub.subCategory[i];
                yield Subcategory.findOneAndDelete({ _id: id });
                // sub.subCategory.shift();
            }
        }
        else {
            for (var i = 0; i < cat.subCategory.length; i++) {
                // console.log(sub.subCategory[i]);
                const id = cat.subCategory[i];
                yield Category.findOneAndDelete({ _id: id });
                // cat.subCategory.shift();
            }
        }
        sub.subCategory = [];
        cat.subCategory = [];
        yield sub.save();
        yield cat.save();
        // await Category.findOneAndDelete({ _id: id });
        // await Subcategory.findOneAndDelete({ _id: id });
        return res.send("deleted!");
    }
    catch (err) {
        return res.send(err);
    }
});
//# sourceMappingURL=category.js.map