import express, { Request, Response } from "express";
const Category = require("../model/category");
const Subcategory = require("../model/subCategory");

exports.createCat = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name,
    });

    await category.save();
    return res.send(category);
  } catch (err) {
    return res.send(err);
  }
};

exports.createSubCat = async (req: Request, res: Response) => {
  try {
    const { name, pId } = req.body;
    const sub = new Subcategory({
      name,
    });
    await sub.save();
    let cat = await Category.findOne({ _id: pId });

    if (cat) {
      cat.subCategory.push(sub);
      await cat.save();
      console.log(cat);
    } else {
      let subCat = await Subcategory.findOne({ _id: pId });
      console.log(subCat);

      subCat.subCategory.push(sub);
      await subCat.save();
    }
    return res.send(sub);
  } catch (err) {
    return res.send(err);
  }
};
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

exports.getAll = async (req: Request, res: Response) => {
  try {
    // console.log(req.params);

    const id = req.params.id;
    // // console.log(id);

    // const allSubcategories = await getAllSubcategories(id);
    // console.log(allSubcategories);

    let result = await Category.findById(id).populate("subCategory");
    console.log(result);
    if (result == null) {
      let ans = await Subcategory.findById(id).populate("subCategory");
      return res.send(ans);
    }

    return res.send(result);
  } catch (err) {
    return res.send(err);
  }
};
// Update

exports.catUpdate = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cat = await Category.findOne({ _id: id });
    const sub = await Subcategory.findOne({ _id: id });
    if (cat) {
      let catUpdate = await Category.findOneAndUpdate(
        { _id: id },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.send(catUpdate);
    } else {
      let subUpdate = await Subcategory.findOneAndUpdate(
        { _id: id },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.send(subUpdate);
    }
  } catch (err) {
    return res.send(err);
  }
};

//  delete

exports.catDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cat = await Category.findOne({ _id: id });
    const sub = await Subcategory.findOne({ _id: id });

    if (sub) {
      for (var i = 0; i < sub.subCategory.length; i++) {
        // console.log(sub.subCategory[i]);
        const id = sub.subCategory[i];
        await Subcategory.findOneAndDelete({ _id: id });
        // sub.subCategory.shift();
      }
    } else {
      for (var i = 0; i < cat.subCategory.length; i++) {
        // console.log(sub.subCategory[i]);
        const id = cat.subCategory[i];
        await Category.findOneAndDelete({ _id: id });
        // cat.subCategory.shift();
      }
    }
    sub.subCategory = [];
    cat.subCategory = [];
    await sub.save();
    await cat.save();

    // await Category.findOneAndDelete({ _id: id });
    // await Subcategory.findOneAndDelete({ _id: id });
    return res.send("deleted!");
  } catch (err) {
    return res.send(err);
  }
};
