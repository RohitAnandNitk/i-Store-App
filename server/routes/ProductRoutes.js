import express from "express";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProductById,
  getTopProducts,
  productReview,
  updateProduct,
  updateProductImage,
} from "../controllers/ProductController.js";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/get-all-products", getAllProducts);
router.get("/:id", getProductById);
router.get("/get/top-products", getTopProducts);
router.post("/add-product", isAuth, isAdmin, singleUpload, createProduct);
router.put("/update-product/:id", isAuth, isAdmin, updateProduct);
router.delete("/delete-product/:id", isAuth, isAdmin, deleteProduct);
router.put(
  "/update-product-image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImage
);
router.delete(
  "/delete-product-image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  deleteProductImage
);

router.put("/review/:id", isAuth, productReview);

export default router;
