import Category from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "category not found",
      });
    }

    const cat = await Category.create({ category });
    res.status(200).send({
      success: true,
      message: "category created successfully",
      cat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create category API",
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send({
      success: true,
      message: "all categories fetched",
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category API",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "category not found",
      });
    }
    // find product by category id
    const products = await Product.find({ category: category._id });
    //update category
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = undefined;
      product.save();
    }
    //delete category
    await category.deleteOne();
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error or OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "invalid product id",
      });
    }
    res.status(500).send({
      success: false,
      message: "error in delete category API",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { newCategory } = req.body;

    // Check if new category name is provided
    if (!newCategory) {
      return res.status(400).send({
        success: false,
        message: "New category name is required",
      });
    }

    // Find category by ID
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Update category name
    category.category = newCategory;
    await category.save();

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);

    // Handle invalid ObjectId error
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid category ID",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error in update category API",
    });
  }
};
