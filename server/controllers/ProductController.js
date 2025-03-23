import Product from "../models/ProductModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";

export const getAllProducts = async (req, res) => {
  const { keyword, category } = req.query;
  try {
    // way of searching product
    const allProducts = await Product.find({
      name: {
        $regex: keyword ? keyword : "",
        $options: "i",
      },
      // category: category ? category : null,
    }).populate("category");
    res.status(200).send({
      success: true,
      message: "all products fetched successfully",
      totalProducts: allProducts.length,
      allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at get all products API",
      error,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    //get product by id
    const product = await Product.findById(req.params.id);
    // validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "a product found successfully",
      product,
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
      message: "Error at get product by id API",
      error,
    });
  }
};

// GET TOP PRODUCT
export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).send({
      success: true,
      message: "top 3 products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get TOP PRODUCTS API",
      error,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    //validation
    // if (!name || !description || !price || !stock) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "enter all fields",
    //   });
    // }

    // validation of file
    if (!req.file) {
      return res.status(500).send({
        success: false,
        message: "please upload the product image",
      });
    }

    //handle product image
    const file = getDataUri(req.file);

    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    // create product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images: [image],
    });
    res.status(201).send({
      success: true,
      message: "product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error at get all products API",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    const { name, description, price, stock, category } = req.body;
    //validate and update
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    // save the product
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product update successfully!",
      product,
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
      message: "Error at update product API",
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    // first of all we have delete images from cloudnary then we delete the product from db
    for (let index = 0; index < product.images.length; index++) {
      await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }
    await product.deleteOne();
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
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
      message: "Error at delete product API",
      error,
    });
  }
};

export const updateProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    if (!req.file) {
      return res.status(404).send({
        success: false,
        message: "Product Image not found",
      });
    }

    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = { public_id: cdb.public_id, url: cdb.secure_url };

    // save the image
    product.images.push(image);
    await product.save();

    res.status(200).send({
      success: true,
      message: "Product image updated",
      product,
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
      message: "Error at update product image API",
      error,
    });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }

    //find image id using query parameter
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "product image id not found",
      });
    }
    let imageIndex = -1;
    product.images.forEach((item, index) => {
      if (item._id.toString() === id.toString()) imageIndex = index;
    });
    // validation of image
    if (imageIndex < 0) {
      return res.status(404).send({
        success: false,
        message: "product image not found",
      });
    }
    // delete image
    await cloudinary.v2.uploader.destroy(product.images[imageIndex].public_id);
    product.images.splice(imageIndex, 1);
    await product.save();
    res.status(200).send({
      success: true,
      message: "product image deleted successfully",
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
      message: "Error at update product image API",
      error,
    });
  }
};

export const productReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    // Find product (await is necessary)
    const product = await Product.findById(req.params.id);

    // Validation: Check if product exists
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product already reviewed",
      });
    }

    // Create a new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Add review to the product
    product.reviews.push(review);

    // Update number of reviews
    product.numReviews = product.reviews.length;

    // Update rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // Save the product
    await product.save();

    res.status(200).send({
      success: true,
      message: "Thanks for your review!",
    });
  } catch (error) {
    console.log(error);

    // Handle invalid ObjectId error
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error in product review API",
      error,
    });
  }
};
