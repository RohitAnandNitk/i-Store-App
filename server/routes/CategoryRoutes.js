import express from "express";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/CategoryController.js";
const router = express.Router();

router.post("/create", isAuth, isAdmin, createCategory);
router.get("/get-all-categories", isAuth, getAllCategory);
router.delete("/delete/:id", isAuth, isAdmin, deleteCategory);
router.put("/update/:id", isAuth, isAdmin, updateCategory);

export default router;
